import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button } from '@mantine/core';
import accountService from '../services';
import ChangePasswordDto from '../types/ChangePasswordDto';
import { useState } from 'react';
import { wait } from '../../../utils/helpers';
import { alertSuccess } from '../../../utils/feedback';
import { useTranslation } from 'react-i18next';

const initialValues: ChangePasswordDto = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
}

export default function ChangePasswordForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation()
    
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
                    label={t("components.changePasswordForm.currentPassword")}
                    placeholder={t("components.changePasswordForm.currentPassword")}
                    {...form.getInputProps('currentPassword')}
                />

                <PasswordInput
                    mt="sm"
                    label={t("components.changePasswordForm.newPassword")}
                    placeholder={t("components.changePasswordForm.newPassword")}
                    {...form.getInputProps('newPassword')}
                />

                <PasswordInput
                    mt="sm"
                    label={t("components.changePasswordForm.confirmNewPassword")}
                    placeholder={t("components.changePasswordForm.confirmNewPassword")}
                    {...form.getInputProps('confirmNewPassword')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type='submit' disabled={isSubmitting} loading={isSubmitting}>{t("buttons.save")}</Button>
                </Group>
            </form>
    );
}