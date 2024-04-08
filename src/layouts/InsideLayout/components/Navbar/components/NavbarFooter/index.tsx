import classes from './index.module.css';
import { AppShell } from '@mantine/core';
import { MouseEvent } from 'react';
import useAuthStore from '../../../../../../store/useAuthStore';
import { useTranslation } from 'react-i18next';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

export function NavbarFooter() {
    const {logout} = useAuthStore()
    const {t} = useTranslation()
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        logout()
    }

    return (
        <AppShell.Section className={classes.footer}>
            <a href="#" className={classes.link} onClick={handleClick}>
                <ArrowRightStartOnRectangleIcon className={classes.linkIcon} />
                <span>{t("buttons.logout")}</span>
            </a>
        </AppShell.Section>
    );
}