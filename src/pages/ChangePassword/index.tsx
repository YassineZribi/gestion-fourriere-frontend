
import { Box, Space } from '@mantine/core';
import Title from '../../components/Title';
import ChangePasswordForm from '../../features/account/components/ChangePasswordForm';

export default function ChangePassword() {

    return (
        <div>
            <Title>Change password</Title>
            <Space my={'xl'} />
            <Box maw={340} mx="auto">
                <ChangePasswordForm />
            </Box>
        </div>
    );
}