import { useState } from 'react';
import { ScrollArea, Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, AppShell, useDirection } from '@mantine/core';
import { AdjustmentsVerticalIcon, ArrowsRightLeftIcon, BuildingLibraryIcon, ChartPieIcon, ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentListIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import classes from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type SimpleMenuItem = {
    label: string;
    icon: React.FC<any>;
    link: string;
    tabs?: string[];
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
    { label: 'Institution', icon: BuildingLibraryIcon, link: '/institution', tabs: ["profile", "chart"] },
    {
        label: 'Basic data',
        icon: ClipboardDocumentListIcon,
        initiallyOpened: false,
        links: [
            { label: 'Warehouses management', link: '/warehouses-management' },
            { label: 'Registers management', link: '/registers-management' },
            { label: 'Sub-registers management', link: '/sub-registers-management' },
            { label: 'Measurement units management', link: '/measurement-units-management' },
            { label: 'Article families management', link: '/article-families-management' },
            { label: 'Articles management', link: '/articles-management' },
            { label: 'Sources management', link: '/sources-management' },
            { label: 'Owners management', link: '/owners-management', tabs: ["individuals", "companies"] }
        ],
    },
    {
        label: 'Operations',
        icon: ArrowsRightLeftIcon,
        initiallyOpened: false,
        links: [
            { label: 'Inputs management', link: '/inputs-management' },
            { label: 'Outputs management', link: '/outputs-management' }
        ],
    },
    {
        label: 'Administration',
        icon: AdjustmentsVerticalIcon,
        initiallyOpened: false,
        links: [
            { label: 'User accounts management', link: '/user-accounts-management' },
        ],
    },
    {
        label: 'Security',
        icon: LockClosedIcon,
        initiallyOpened: false,
        links: [
            { label: 'Change password', link: '/change-password' },
        ],
    }
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
            className={classNames(classes.link, { [classes.active]: pathname === link.link || link.tabs?.some(tab => pathname === link.link + "/" + tab) })}
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

export function SingleLink({ icon: Icon, label, link, tabs }: SingleLinkProps) {
    const { pathname } = useLocation()

    return (
        <div className={classes.container}>
            <UnstyledButton component={Link} to={link} className={classNames(classes.control, { [classes.active]: pathname === link || tabs?.some(tab => pathname === link + "/" + tab) })}>
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