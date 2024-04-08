import { AppShell, Burger, Group, Text, rem } from '@mantine/core';
import { ToggleThemeButton } from '../../../components/ToggleThemeButton';
import { UserMenu } from '../../../components/UserMenu';
import { LanguagePicker } from '../../../components/LanguagePicker';
import { HomeIcon } from '@heroicons/react/24/outline';

interface Props {
    opened: boolean
    toggle: () => void
}

export default function Header({ opened, toggle }: Props) {

    return (
        <AppShell.Header>
            <Group h="100%" justify="space-between">
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <HomeIcon style={{ width: rem(30), height: rem(30) }} />
                    <Text size="lg" fw={700}>Logo</Text>
                </Group>
                <Group h="100%" px="xs">
                    <LanguagePicker />
                    <ToggleThemeButton />
                    <UserMenu />
                </Group>
            </Group>
        </AppShell.Header>
    );
}