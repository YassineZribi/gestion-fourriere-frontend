import { useState } from "react";
import { Anchor, Button, Group, Modal, PasswordInput, Radio, SimpleGrid, Stack, TextInput, useDirection } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import Role from "../../../types/Role";
import usersService from '../services/users';
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import CountriesPhoneNumbersCombobox from "../../../components/CountriesPhoneNumbersCombobox";


const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    dial_code: z.string(),
    nationalPhoneNumber: z.string().min(1, 'Phone number is required'),
    roleName: z.string().min(1, 'Role is required')
});

export type FormData = z.infer<typeof schema>

export type CreateUserDto = Omit<FormData, 'dial_code' | 'nationalPhoneNumber'> & {phoneNumber: string}

interface Props {
    title: string
    isOpened: boolean
    roles: Role[]
    onCancel: () => void
    onSubmit: () => void
}

export default function CreateUserModal({ title, isOpened, roles, onCancel, onSubmit }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { dir } = useDirection();
    const form = useForm<FormData>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            dial_code: '+216',
            nationalPhoneNumber: '',
            roleName: ''
        },
        validate: zodResolver(schema),
    });


    const handleCancel = () => {
        form.reset()
        onCancel()
    }

    const handleSubmit = async (data: FormData) => {
        setIsSubmitting(true)

        const createUserDto: CreateUserDto = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.dial_code + data.nationalPhoneNumber,
            roleName: data.roleName
        }

        try {
            await wait(2000)
            await usersService.createUser(createUserDto)
            alertSuccess("New user account created successfully!")
            form.reset()
            onSubmit()
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false)
        }


    }

    return (
        <Modal title={title} opened={isOpened} onClose={handleCancel} closeOnClickOutside={false}>
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

                    <div style={{ position: 'relative' }}>
                        <TextInput
                            type='text'
                            styles={{ input: { paddingInlineStart: 100 } }}
                            name="nationalPhoneNumber"
                            label="Phone Number"
                            placeholder="enter your phone number"
                            {...form.getInputProps('nationalPhoneNumber')}
                        />
                        <div style={{ position: 'absolute', top: 24.8, transform: `scale(0.9) translateX(${dir === "ltr" ? "-" : ""}4px)` }}>
                            <CountriesPhoneNumbersCombobox
                                style={{
                                    width: 100
                                }}
                                onChange={(v) => form.setFieldValue('dial_code', v)}
                                dial_code={form.values.dial_code}
                            />
                        </div>
                    </div>

                    <Radio.Group
                        label="Role"
                        name="roleName"
                        {...form.getInputProps('roleName')}
                        withAsterisk
                    >
                        <Group justify="center" gap={"xl"}>
                            {
                                roles.map(role => (
                                    <Radio
                                        key={role.id}
                                        value={role.name.toLowerCase()}
                                        label={upperFirst(role.name.toLowerCase())}
                                    />
                                ))
                            }
                        </Group>
                    </Radio.Group>
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" variant="gradient" onClick={handleCancel} size="sm">
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