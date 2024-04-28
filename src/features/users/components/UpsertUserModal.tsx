import { useState } from "react";
import { Anchor, Button, Group, Modal, Radio, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import User from "../../../types/User";
import { getCountryCallingCode, getNationalNumber } from "../../../lib/libphonenumber-js";
import { capitalize, wait } from "../../../utils/helpers";
import PhoneInputWithCountryCombobox from "../../../components/PhoneInput";
import useRolesStore from "../../../store/useRolesStore";
import usersService from "../services"
import { alertSuccess } from "../../../utils/feedback";


const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    dial_code: z.string(),
    nationalPhoneNumber: z.string().min(1, 'Phone number is required'),
    roleName: z.string().min(1, 'Role is required')
});

export type FormData = z.infer<typeof schema>

export type UpsertUserDto = Omit<FormData, 'dial_code' | 'nationalPhoneNumber'> & { phoneNumber: string }

interface Props {
    title: string
    isOpened: boolean
    selectedUser?: User
    onClose: () => void
    onSubmit: () => void
}

export default function UpsertUserModal({ title, isOpened, selectedUser, onClose, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)
    const {roles} = useRolesStore()

    const form = useForm<FormData>({
        initialValues: {
            firstName: selectedUser?.firstName || '',
            lastName: selectedUser?.lastName || '',
            email: selectedUser?.email || '',
            dial_code: (selectedUser?.phoneNumber && getCountryCallingCode(selectedUser.phoneNumber)) ?? '+216',
            nationalPhoneNumber: (selectedUser?.phoneNumber && getNationalNumber(selectedUser.phoneNumber)) ?? '',
            roleName: selectedUser?.role.name.toLowerCase() || ''
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertUserDto: UpsertUserDto = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.dial_code + data.nationalPhoneNumber,
            roleName: data.roleName
        }

        
        try {
            setSubmitting(true)
            await wait(2000)
            if (selectedUser) {
                await usersService.updateUser(selectedUser.id, upsertUserDto)
                alertSuccess("User account updated successfully!")
            } else {
                await usersService.createUser(upsertUserDto)
                alertSuccess("New user account created successfully!")
                form.reset()
            }

            onSubmit()
            onClose()
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal title={title} opened={isOpened} onClose={onClose} closeOnClickOutside={false}>
            <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <TextInput
                            data-autofocus
                            label="First Name"
                            placeholder="First name"
                            name="firstName"
                            withAsterisk
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Last name"
                            name="lastName"
                            withAsterisk
                            {...form.getInputProps('lastName')}
                        />
                    </SimpleGrid>

                    <TextInput
                        label="Email"
                        placeholder="example@example.com"
                        name="email"
                        withAsterisk
                        {...form.getInputProps('email')}
                    />

                    <PhoneInputWithCountryCombobox
                        input={{
                            name: "nationalPhoneNumber",
                            ...form.getInputProps('nationalPhoneNumber')
                        }}
                        combobox={{
                            onChange: (v) => form.setFieldValue('dial_code', v),
                            dial_code: form.values.dial_code
                        }}
                    />

                    <Radio.Group
                        label="Role"
                        name="roleName"
                        {...form.getInputProps('roleName')}
                        withAsterisk
                    >
                        <Group justify="center" gap={"xl"}>
                            {
                                roles.map((role) => (
                                    <Radio

                                        key={role.id}
                                        value={role.name.toLowerCase()}
                                        label={capitalize(role.name)}
                                    />
                                ))
                            }
                        </Group>
                    </Radio.Group>
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" variant="gradient" onClick={onClose} size="sm">
                        Cancel
                    </Anchor>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                        Save
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}