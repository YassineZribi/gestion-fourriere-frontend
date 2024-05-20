import { useState } from "react";
import { Anchor, Avatar, Button, Center, FileInput, Group, InputLabel, Modal, ModalBaseProps, SimpleGrid, Stack, TextInput, Tooltip, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import employeesService from "../services"
import { capitalize, wait } from "../../../utils/helpers";
import Employee from "../../../types/Employee";
import { alertInfo, alertSuccess } from "../../../utils/feedback";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getFullResourcePath } from "../../../lib/axios/api";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import EmployeeSelectOption from "./EmployeeSelectOption";


const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    position: z.string().min(1, 'Last name is required'),
});

export type FormData = z.infer<typeof schema>

export type UpsertEmployeeDto = FormData & { managerId: number | null }

interface Props {
    title: string
    size?: ModalBaseProps['size']
    isOpened: boolean
    selectedEmployee?: Employee
    onClose: () => void
    onSubmit: (savedEmployee: Employee) => void
}

export default function UpsertEmployeeModal({ title, size = "md", isOpened, selectedEmployee, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const [manager, setManager] = useState(selectedEmployee?.manager ?? null)
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<FormData>({
        initialValues: {
            firstName: selectedEmployee?.firstName || '',
            lastName: selectedEmployee?.lastName || '',
            position: selectedEmployee?.position || '',
        },
        validate: zodResolver(schema),
    });


    const handleCancel = () => {
        onClose()
    }

    const handleSubmit = async (data: FormData) => {
        const upsertEmployeeDto: UpsertEmployeeDto = {
            firstName: data.firstName,
            lastName: data.lastName,
            position: data.position,
            managerId: manager?.id ?? null
        }

        let savedEmployee: Employee;

        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedEmployee) {
                const res = await employeesService.updateEmployee(selectedEmployee.id, upsertEmployeeDto, photoFile)
                savedEmployee = res.data
                alertSuccess("Employee updated successfully!")
            } else {
                const res = await employeesService.createEmployee(upsertEmployeeDto, photoFile)
                savedEmployee = res.data
                alertSuccess("New employee added successfully!")
                form.reset()
                setManager(null)
            }
            setPhotoFile(null)
            
            onSubmit(savedEmployee)
            onClose()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal title={title} size={size} opened={isOpened} onClose={handleCancel} closeOnClickOutside={false}>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Center mb={'xl'}>
                    <div style={{ position: 'relative' }}>
                        {
                            photoFile !== null && (
                                <Tooltip label={t("buttons.removeModification")} withArrow position='bottom'>
                                    <Avatar color="red" variant='filled' size={30} style={{ position: "absolute", left: 0, bottom: 0, zIndex: 1, cursor: 'pointer' }} onClick={() => setPhotoFile(null)}>
                                        <TrashIcon style={{ width: rem(14), height: rem(14) }} />
                                    </Avatar>
                                </Tooltip>
                            )
                        }
                        <InputLabel htmlFor='profile-photo'>
                            <Tooltip label={t("buttons.update")} withArrow position='bottom'>
                                <Avatar color="blue" variant='filled' size={30} style={{ position: "absolute", right: 0, bottom: 0, zIndex: 1, cursor: 'pointer' }}>
                                    <PencilIcon style={{ width: rem(14), height: rem(14) }} />
                                </Avatar>
                            </Tooltip>
                        </InputLabel>
                        <Avatar
                            size={120}
                            radius={120}
                            style={{ border: "2px solid" }}
                            src={
                                photoFile
                                    ? URL.createObjectURL(photoFile)
                                    : selectedEmployee?.photoPath ? getFullResourcePath(selectedEmployee.photoPath) : null
                            }
                        />
                        <FileInput
                            id='profile-photo'
                            accept="image/*"
                            onChange={file => {
                                setPhotoFile(file);
                                alertInfo('Click on "Save changes" to confirm the modification')
                            }}
                            style={{ display: 'none' }}
                        />
                    </div>
                </Center>
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
                            label={tGlossary("employee.position")}
                            placeholder={tGlossary("employee.position")}
                            name="position"
                            withAsterisk
                            {...form.getInputProps('position')}
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

                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" variant="gradient" onClick={handleCancel} size="sm">
                        {t("buttons.cancel")}
                    </Anchor>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                        {t("buttons.confirm")}
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}