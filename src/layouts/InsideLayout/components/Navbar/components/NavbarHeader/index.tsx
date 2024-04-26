import { AppShell, Avatar, Divider, Group, Text } from '@mantine/core';
import useAuthStore from '../../../../../../store/useAuthStore';
import { getFullResourcePath } from '../../../../../../lib/axios/api';


export function NavbarHeader() {
    const {user} = useAuthStore()

    return (
        <AppShell.Section>
            <Group>
                <Avatar
                    radius="xl"
                    style={{border: "1px solid"}}
                    src={user?.photoPath ? getFullResourcePath(user.photoPath) : ""}
                />

                <div>
                    <Text fw={500}>{user?.firstName} {user?.lastName}</Text>
                    <Text size="xs" c="dimmed">
                        {user?.email}
                    </Text>
                </div>
            </Group>
            <Divider mt={'lg'} />
        </AppShell.Section>
    );
}