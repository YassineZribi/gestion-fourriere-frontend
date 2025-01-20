import classes from './index.module.css'
import { Center, Group, Table, Text, UnstyledButton, rem } from '@mantine/core';
import { ArrowLongDownIcon, ArrowLongUpIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface ThProps {
  children: React.ReactNode;
  sortList: string[]
  name: string
  style?: React.CSSProperties
  onSort: (name: string) => void;
}

export default function Th({ style, children, sortList, name, onSort }: ThProps) {
  const findSortItem = (name: string) => {
    return sortList.find(sortItem => sortItem.split("-")[0] === name)
  }
  const findSortItemIndex = (name: string) => {
    return sortList.findIndex(sortItem => sortItem.split("-")[0] === name)
  }

  const getSortPriority = (name: string) => {
    const index = findSortItemIndex(name)
    if (index === -1)
      return null
    else
      return index + 1
  }

  const isSorted = (name: string): boolean => {
    return !!findSortItem(name)
  }
  const isReversed = (name: string): boolean => {
    const item = findSortItem(name)
    return item !== undefined && item.split("-")[1] === "desc"
  }

  const priority = getSortPriority(name)

  const Icon = isSorted(name) ? (isReversed(name) ? ArrowLongDownIcon : ArrowLongUpIcon) : ChevronUpDownIcon;
  return (
    <Table.Th className={classes.th} style={style}>
      <UnstyledButton onClick={() => onSort(name)} className={classes.control}>
        <Group justify="space-between" wrap='nowrap'>
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Group wrap='nowrap' gap={0}>
            <Text fw={500} fz="sm">
              {priority !== null && <>({priority})</>}
            </Text>
            <Center className={classes.icon}>
              <Icon style={{ width: rem(16), height: rem(16) }} />
            </Center>
          </Group>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}