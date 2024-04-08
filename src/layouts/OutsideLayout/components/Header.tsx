import { AppShell, Group, Text, rem } from '@mantine/core';
import { ToggleThemeButton } from '../../../components/ToggleThemeButton';
import { LanguagePicker } from '../../../components/LanguagePicker';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function Header() {

    return (
        <AppShell.Header>
            <Group h="100%" justify="space-between">
                <Group h="100%" px="md">
                    <HomeIcon style={{ width: rem(30), height: rem(30) }} />
                    <Text size="lg" fw={700}>Logo</Text>
                </Group>
                <Group h="100%" px="xs">
                    <LanguagePicker />
                    <ToggleThemeButton />
                </Group>
            </Group>
        </AppShell.Header>
    );
}