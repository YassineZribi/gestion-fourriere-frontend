
import { Box, Space } from '@mantine/core';
import Title from '../../components/Title';
import ChangePasswordForm from '../../features/account/components/ChangePasswordForm';
import { useTranslation } from 'react-i18next';

export default function ChangePassword() {
    const { t } = useTranslation("root")
    return (
        <div>
            <Title>{t("changePassword.title")}</Title>
            <Space my={'xl'} />
            <Box maw={340} mx="auto">
                <ChangePasswordForm />
            </Box>
        </div>
    );
}