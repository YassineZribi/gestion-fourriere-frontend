import classes from './index.module.css'
import { Center, Group, Table, Text, UnstyledButton, rem } from '@mantine/core';
import { ArrowLongDownIcon, ArrowLongUpIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface ThProps {
  children: React.ReactNode;
  style?: React.CSSProperties
  reversed: boolean;
  sorted: boolean;
  priority: number | null;
  onSort(): void;
}

export default function Th({ style, children, reversed, sorted, priority, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? ArrowLongDownIcon : ArrowLongUpIcon) : ChevronUpDownIcon;
  return (
    <Table.Th className={classes.th} style={style}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children} {priority !== null && <>({priority})</>}
          </Text>

          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}