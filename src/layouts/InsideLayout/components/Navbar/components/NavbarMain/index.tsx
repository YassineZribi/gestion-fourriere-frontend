import { useMemo, useState } from 'react';
import { ScrollArea, Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, AppShell, useDirection } from '@mantine/core';
import { AdjustmentsVerticalIcon, ArrowsRightLeftIcon, BuildingLibraryIcon, ChartPieIcon, ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentListIcon, UserIcon } from '@heroicons/react/24/outline'
import classes from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type GenericMenuItem = {
    label: string;
    icon: React.FC<any>;
}

type SimpleMenuItem = GenericMenuItem & {
    link: string;
    tabs?: string[];
}

type ComplexMenuItem = GenericMenuItem & {
    initiallyOpened?: boolean;
    links: Omit<SimpleMenuItem, "icon">[]
}

type MenuItem = SimpleMenuItem | ComplexMenuItem

function isSimpleMenuItem(item: MenuItem): item is SimpleMenuItem {
    return (item as SimpleMenuItem).link !== undefined;
}

export function NavbarMain() {
    const { t } = useTranslation()
    const menuData: MenuItem[] = useMemo(() => [
        { label: t('menu.dashboard'), icon: ChartPieIcon, link: '/dashboard' },
        { label: t('menu.myAccount'), icon: UserIcon, link: '/my-account', tabs: ["profile", "change-password"] },
        { label: t('menu.institution'), icon: BuildingLibraryIcon, link: '/institution', tabs: ["profile", "chart"] },
        {
            label: t('menu.basicData.index'),
            icon: ClipboardDocumentListIcon,
            initiallyOpened: false,
            links: [
                { label: t('menu.basicData.warehouses'), link: '/warehouses-management' },
                { label: t('menu.basicData.registers'), link: '/registers-management' },
                { label: t('menu.basicData.subRegisters'), link: '/sub-registers-management' },
                { label: t('menu.basicData.measurementUnits'), link: '/measurement-units-management' },
                { label: t('menu.basicData.articleFamilies'), link: '/article-families-management' },
                { label: t('menu.basicData.articles'), link: '/articles-management' },
                { label: t('menu.basicData.sources'), link: '/sources-management' },
                { label: t('menu.basicData.owners'), link: '/owners-management', tabs: ["individuals", "companies"] }
            ],
        },
        {
            label: t('menu.operations.index'),
            icon: ArrowsRightLeftIcon,
            initiallyOpened: false,
            links: [
                { label: t('menu.operations.inputs'), link: '/inputs-management' },
                { label: t('menu.operations.outputs'), link: '/outputs-management' }
            ],
        },
        {
            label: t('menu.administration.index'),
            icon: AdjustmentsVerticalIcon,
            initiallyOpened: false,
            links: [
                { label: t('menu.administration.userAccountsManagement'), link: '/users-management' },
            ],
        }
    ], [t]);

    const links = useMemo(() => menuData.map((item) => {
        if (isSimpleMenuItem(item)) {
            // menuItem is of type SimpleMenuItem
            console.log("menuItem is of type SimpleMenuItem");
            return <SingleLink {...item} key={item.label} />
        }

        // menuItem is of type ComplexMenuItem
        console.log("menuItem is of type ComplexMenuItem");
        return <LinksGroup {...item} key={item.label} />
    }), [menuData]);

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
    const [opened, setOpened] = useState(() => {
        const isLinksGroupActive = links.some(link => pathname === link.link || link.tabs?.some(tab => pathname === link.link + "/" + tab))
        return initiallyOpened || isLinksGroupActive
    });
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