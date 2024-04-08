import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import images from './assets';
import classes from './index.module.css';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const data = [
    { image: images.arabic, language: 'ar' },
    { image: images.english, language: 'en' },
    { image: images.french, language: 'fr' }
] as const;

export function LanguagePicker() {
    const [opened, setOpened] = useState(false);
    const {t, i18n: { language, changeLanguage } } = useTranslation()
    const [selected, setSelected] = useState(() => {
        return data.find(c => c.language === language) || data[1]
    });
    
    const items = data.map((item) => (
        <Menu.Item
            leftSection={<Image src={item.image} width={18} height={18} />}
            onClick={() => {setSelected(item); changeLanguage(item.language)}}
            key={item.language}
        >
            {t(`locales.${item.language}`)}
        </Menu.Item>
    ));

    return (
        <div className={classes.container}>
            <Menu
                onOpen={() => setOpened(true)}
                onClose={() => setOpened(false)}
                radius="md"
                width="target"
                withinPortal
            >
                <Menu.Target>
                    <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
                        <Group gap="xs">
                            <Image src={selected.image} width={22} height={22} />
                            <span className={classes.label}>{t(`locales.${selected.language}`)}</span>
                        </Group>
                        <ChevronDownIcon width={"1rem"} className={classes.icon} />
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>{items}</Menu.Dropdown>
            </Menu>
        </div>
    );
}