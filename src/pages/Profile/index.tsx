
import { Box } from '@mantine/core';
import Title from '../../components/Title';
import UpdateProfileForm from '../../features/account/components/UpdateProfileForm';

export default function Profile() {

    return (
        <div>
            <Title>My profile</Title>
            <Box maw={600} mx="auto">
            <UpdateProfileForm />
            </Box>
        </div>
    );
}