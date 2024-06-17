import { useState } from "react";
import { Anchor, Button, Group, Modal, ModalBaseProps, Radio, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { getCountryCallingCode, getNationalNumber } from "../../../../lib/libphonenumber-js";
import { capitalize, wait } from "../../../../utils/helpers";
import PhoneInputWithCountryCombobox from "../../../../components/PhoneInput";
import useRolesStore from "../../../../store/useRolesStore";
import employeesService from "../services"
import { alertSuccess } from "../../../../utils/feedback";
import { useTranslation } from "react-i18next";
import { RoleNameLowercase } from "../../../../types/Role";
import SearchableCombobox from "../../../../components/SearchableCombobox";
import EmployeeSelectOption from "./EmployeeSelectOption";
import Employee from "../../../../types/Employee";


const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    dial_code: z.string(),
    nationalPhoneNumber: z.string().min(1, 'Phone number is required'),
    roleName: z.string().min(1, 'Role is required'),
    position: z.string().min(1, 'Last name is required')
});

export type FormData = z.infer<typeof schema>

export type UpsertEmployeeDto = Omit<FormData, 'dial_code' | 'nationalPhoneNumber'> & { phoneNumber: string } & { managerId: number | null }

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    selectedEmployee?: Employee
    onClose: () => void
    onSubmit: (savedEmployee: Employee) => void
}

export default function UpsertEmployeeModal({ title, size = "lg", isOpened, selectedEmployee, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const { roles } = useRolesStore()
    const [manager, setManager] = useState(selectedEmployee?.manager ?? null)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            firstName: selectedEmployee?.firstName || '',
            lastName: selectedEmployee?.lastName || '',
            email: selectedEmployee?.email || '',
            dial_code: (selectedEmployee?.phoneNumber && getCountryCallingCode(selectedEmployee.phoneNumber)) ?? '+216',
            nationalPhoneNumber: (selectedEmployee?.phoneNumber && getNationalNumber(selectedEmployee.phoneNumber)) ?? '',
            roleName: selectedEmployee?.role.name.toLowerCase() || '',
            position: selectedEmployee?.position || ''
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertEmployeeDto: UpsertEmployeeDto = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.dial_code + data.nationalPhoneNumber,
            roleName: data.roleName,
            position: data.position,
            managerId: manager?.id ?? null
        }

        let savedEmployee: Employee;

        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedEmployee) {
                const res = await employeesService.updateEmployee(selectedEmployee.id, upsertEmployeeDto)
                savedEmployee = res.data
                alertSuccess("Employee account updated successfully!")
            } else {
                const res = await employeesService.createEmployee(upsertEmployeeDto)
                savedEmployee = res.data
                alertSuccess("New employee account created successfully!")
                form.reset()
                setManager(null)
            }

            onSubmit(savedEmployee)
            onClose()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal title={title} size={size} opened={isOpened} onClose={onClose} closeOnClickOutside={false}>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <TextInput
                            data-autofocus
                            label={tGlossary("employee.firstName")}
                            placeholder={tGlossary("employee.firstName")}
                            name="firstName"
                            withAsterisk
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            label={tGlossary("employee.lastName")}
                            placeholder={tGlossary("employee.lastName")}
                            name="lastName"
                            withAsterisk
                            {...form.getInputProps('lastName')}
                        />
                    </SimpleGrid>

                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <TextInput
                            label={tGlossary("employee.email")}
                            placeholder={tGlossary("employee.email")}
                            name="email"
                            withAsterisk
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label={tGlossary("employee.position")}
                            placeholder={tGlossary("employee.position")}
                            name="position"
                            withAsterisk
                            {...form.getInputProps('position')}
                        />
                    </SimpleGrid>

                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <PhoneInputWithCountryCombobox
                            input={{
                                label: tGlossary("employee.phoneNumber"),
                                placeholder: tGlossary("employee.phoneNumber"),
                                name: "nationalPhoneNumber",
                                ...form.getInputProps('nationalPhoneNumber')
                            }}
                            combobox={{
                                onChange: (v) => form.setFieldValue('dial_code', v),
                                dial_code: form.values.dial_code
                            }}
                        />
                        <SearchableCombobox
                            selectedEntity={manager}
                            placeholder={tGlossary("employee.manager")}
                            label={tGlossary("employee.manager")}
                            onFetch={employeesService.getAllEmployeesByFullName}
                            onSelectOption={newEmployee => {
                                setManager(newEmployee)
                            }}
                            onClear={() => {
                                setManager(null)
                            }}
                        >
                            {
                                (employee) => <EmployeeSelectOption employee={employee} />
                            }
                        </SearchableCombobox>
                    </SimpleGrid>

                    <Radio.Group
                        label={tGlossary("employee.role")}
                        name="roleName"
                        {...form.getInputProps('roleName')}
                        withAsterisk
                    >
                        <Group justify="center" gap={"xl"}>
                            {
                                roles.map((role) => {
                                    const roleNameLowercase = role.name.toLowerCase() as RoleNameLowercase;
                                    return (
                                        <Radio
                                            key={role.id}
                                            value={role.name.toLowerCase()}
                                            label={capitalize(tGlossary(`roles.${roleNameLowercase}`))}
                                        />
                                    )
                                })
                            }
                        </Group>
                    </Radio.Group>
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" variant="gradient" onClick={onClose} size="sm">
                        {t("buttons.cancel")}
                    </Anchor>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                        {t("buttons.save")}
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}