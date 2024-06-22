
import { Box, Space, Tabs } from '@mantine/core';
import UpdateProfileForm from '../../features/account/components/UpdateProfileForm';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import ChangePasswordForm from '../../features/account/components/ChangePasswordForm';

export const myAccountTabs = ["profile", "change-password"] as const
const schema = z.enum(myAccountTabs)
const { profile } = schema.Values

export default function MyAccount() {
    const navigate = useNavigate();
    const { tab: currentTab } = useParams();
    const { t } = useTranslation('root')

    const value = schema.safeParse(currentTab).success ? currentTab : profile

    const handleChangeTab = (newValue: string | null) => {
        navigate(`/my-account/${newValue ?? profile}`)
    }

    return (
        <Tabs keepMounted={false} variant="outline" value={value} onChange={handleChangeTab}>
            <Tabs.List>
                <Tabs.Tab value={profile}>
                    {t('myAccount.tabs.profile')}
                </Tabs.Tab>
                <Tabs.Tab value={schema.Values['change-password']}>
                    {t('myAccount.tabs.changePassword')}
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={profile}>
                <Box maw={600} mx="auto">
                    <UpdateProfileForm />
                </Box>
            </Tabs.Panel>

            <Tabs.Panel value={schema.Values['change-password']}>
                <Space my={'xl'} />
                <Box maw={340} mx="auto">
                    <ChangePasswordForm />
                </Box>
            </Tabs.Panel>

        </Tabs>
    );
}