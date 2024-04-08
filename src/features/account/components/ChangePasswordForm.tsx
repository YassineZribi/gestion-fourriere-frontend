import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button } from '@mantine/core';
import accountService from '../services/account';
import ChangePasswordDto from '../types/ChangePasswordDto';
import { useState } from 'react';
import { wait } from '../../../utils/helpers';
import { alertSuccess } from '../../../utils/feedback';

const initialValues: ChangePasswordDto = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
}

export default function ChangePasswordForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({
        initialValues,

        validate: {
            currentPassword: (value) => value.trim().length === 0 ? "Current password is required" : null,
            newPassword: (value) => value.trim().length === 0 ? "New password is required" : null,
            confirmNewPassword: (value, values) =>
                value.trim().length === 0
                    ? "Confirm password is required"
                    : value !== values.newPassword
                        ? 'Passwords did not match'
                        : null
        },
    });

    const handleSubmit = async (data: ChangePasswordDto) => {
        setIsSubmitting(true)
        try {
            await wait(2000)
            await accountService.changePassword(data)
            alertSuccess("Password updated successfully!")
            form.reset()
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <PasswordInput
                    label="Current password"
                    placeholder="Current password"
                    {...form.getInputProps('currentPassword')}
                />

                <PasswordInput
                    mt="sm"
                    label="New password"
                    placeholder="New password"
                    {...form.getInputProps('newPassword')}
                />

                <PasswordInput
                    mt="sm"
                    label="Confirm new password"
                    placeholder="Confirm new password"
                    {...form.getInputProps('confirmNewPassword')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type='submit' disabled={isSubmitting} loading={isSubmitting}>Submit</Button>
                </Group>
            </form>
    );
}