import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    TextInput,
    PasswordInput,
    Anchor,
    Button,
    Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { wait } from '../../../utils/helpers';
import authService from '../services';
import useAuthStore from '../../../store/useAuthStore';
import { alertSuccess } from '../../../utils/feedback';

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password should have at least 4 characters")
});

export type LoginDto = z.infer<typeof schema>

export default function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const authStore = useAuthStore()
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const form = useForm<LoginDto>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: LoginDto) => {
        setIsSubmitting(true)
        try {
            await wait(2000)
            const res = await authService.login(data)
            console.log(res.data)
            authStore.login(res.data)
            alertSuccess("Welcome " + res.data.user.firstName)
        } catch (error) {
            console.log(error);

        } finally {
            setIsSubmitting(false)
        }

    }


    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label={tGlossary('user.email')}
                    placeholder=""
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    withAsterisk
                    label={tGlossary('user.password')}
                    placeholder=""
                    {...form.getInputProps('password')}
                    mt="md"
                />
                <Button type='submit' disabled={isSubmitting} loading={isSubmitting} loaderProps={{ type: 'oval' }} fullWidth mt="xl">
                    {t('buttons.login')}
                </Button>
                <Text ta="end">
                    <Anchor component={Link} to={'/forgot-password'} size="sm">
                        {t('components.loginForm.forgotPassword')}
                    </Anchor>
                </Text>
            </form>
        </>
    );
}