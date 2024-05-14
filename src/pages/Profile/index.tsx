
import { Box } from '@mantine/core';
import Title from '../../components/Title';
import UpdateProfileForm from '../../features/account/components/UpdateProfileForm';
import { useTranslation } from 'react-i18next';

export default function Profile() {
    const {t} = useTranslation('root')

    return (
        <div>
            <Title>{t('profile.title')}</Title>
            <Box maw={600} mx="auto">
            <UpdateProfileForm />
            </Box>
        </div>
    );
}