import { useState } from 'react';
import { ScrollArea, Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, AppShell, useDirection } from '@mantine/core';
import { AdjustmentsVerticalIcon, ChartPieIcon, ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentListIcon, LockClosedIcon, PresentationChartBarIcon, UserIcon } from '@heroicons/react/24/outline'
import classes from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type SimpleMenuItem = {
    label: string;
    icon: React.FC<any>;
    link: string;
}

type ComplexMenuItem = {
    label: string;
    icon: React.FC<any>;
    initiallyOpened?: boolean;
    links: Omit<SimpleMenuItem, "icon">[]
}

type MenuItem = SimpleMenuItem | ComplexMenuItem

const mockdata: MenuItem[] = [
    { label: 'Dashboard', icon: ChartPieIcon, link: '/dashboard' },
    { label: 'Profile', icon: UserIcon, link: '/profile' },
    {
        label: 'Basic data',
        icon: ClipboardDocumentListIcon,
        initiallyOpened: true,
        links: [
            { label: 'Institution', link: '/institution' },
            { label: 'Warehouses management', link: '/warehouses-management' },
            { label: 'Registers management', link: '/registers-management' },
        ],
    },
    {
        label: 'Administration',
        icon: PresentationChartBarIcon,
        initiallyOpened: true,
        links: [
            { label: 'User accounts management', link: '/user-accounts-management' },
        ],
    },
    {
        label: 'Security',
        icon: LockClosedIcon,
        initiallyOpened: true,
        links: [
            { label: 'Change password', link: '/change-password' },
        ],
    },
    { label: 'Settings', icon: AdjustmentsVerticalIcon, link: '/settings' },
];

function isSimpleMenuItem(item: MenuItem): item is SimpleMenuItem {
    return (item as SimpleMenuItem).link !== undefined;
}

export function NavbarMain() {
    const links = mockdata.map((item) => {
        if (isSimpleMenuItem(item)) {
            // menuItem is of type SimpleMenuItem
            console.log("menuItem is of type SimpleMenuItem");
            return <SingleLink {...item} key={item.label} />
        }

        // menuItem is of type ComplexMenuItem
        console.log("menuItem is of type ComplexMenuItem");
        return <LinksGroup {...item} key={item.label} />
    });

    return (
        <AppShell.Section className={classes.links} grow my="md" component={ScrollArea}>
            {links}
        </AppShell.Section>
    );
}


type LinksGroupProps = ComplexMenuItem

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
    const { pathname } = useLocation()

    const { dir } = useDirection();
    const IconChevron = dir === "ltr" ? ChevronRightIcon : ChevronLeftIcon
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = links.map((link) => (
        <Text
            component={Link}
            className={classNames(classes.link, { [classes.active]: pathname === link.link })}
            to={link.link}
            key={link.label}
            onClick={() => {/*event.preventDefault()*/ }}
        >
            {link.label}
        </Text>
    ));

    return (
        <div className={classes.container}>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon style={{ width: rem(18), height: rem(18) }} />
                        </ThemeIcon>
                        <Box ms="md">{label}</Box>
                    </Box>
                    <IconChevron
                        className={classes.chevron}
                        style={{
                            width: rem(16),
                            height: rem(16),
                            transform: opened ? (dir === "ltr" ? 'rotate(-90deg)' : 'rotate(90deg)') : 'none',
                        }}
                    />
                </Group>
            </UnstyledButton>
            <Collapse in={opened}>{items}</Collapse>
        </div>
    );
}






type SingleLinkProps = SimpleMenuItem

export function SingleLink({ icon: Icon, label, link }: SingleLinkProps) {
    const { pathname } = useLocation()

    return (
        <div className={classes.container}>
            <UnstyledButton component={Link} to={link} className={classNames(classes.control, { [classes.active]: pathname === link })}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon style={{ width: rem(18), height: rem(18) }} />
                        </ThemeIcon>
                        <Box ms="md">{label}</Box>
                    </Box>
                </Group>
            </UnstyledButton>
        </div>
    );
}