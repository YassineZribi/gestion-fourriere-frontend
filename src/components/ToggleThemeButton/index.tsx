import cx from 'clsx';
import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Group } from '@mantine/core';
import classes from './index.module.css';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export function ToggleThemeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <SunIcon className={cx(classes.icon, classes.light)} />
        <MoonIcon className={cx(classes.icon, classes.dark)} />
      </ActionIcon>
    </Group>
  );
}