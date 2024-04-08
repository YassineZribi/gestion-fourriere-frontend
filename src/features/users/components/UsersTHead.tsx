import { ActionIcon, Group, Table, rem } from "@mantine/core";
import { columnsWidth } from "./helpers";
import Th from "../../../components/Th";
import { FunnelIcon } from "@heroicons/react/24/outline";

interface Props {
    sortList: string[]
    showFilters: boolean
    onSort: (name: string) => void
    onToggleFilters: () => void
}

export default function UsersTHead({ sortList, showFilters, onSort, onToggleFilters }: Props) {

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

    return (
        <Table.Thead>
            <Table.Tr>
                <Table.Th style={{ width: columnsWidth.avatar }}></Table.Th>
                <Th
                    sorted={isSorted("firstName")}
                    reversed={isReversed("firstName")}
                    priority={getSortPriority("firstName")}
                    onSort={() => onSort("firstName")}
                >
                    First Name
                </Th>
                <Th
                    sorted={isSorted("lastName")}
                    reversed={isReversed("lastName")}
                    priority={getSortPriority("lastName")}
                    onSort={() => onSort("lastName")}
                >
                    Last Name
                </Th>
                <Table.Th>Roles</Table.Th>
                <Th
                    sorted={isSorted("email")}
                    reversed={isReversed("email")}
                    priority={getSortPriority("email")}
                    onSort={() => onSort("email")}
                >
                    Email
                </Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th style={{ width: columnsWidth.actions, paddingBottom: 0, paddingTop: 0 }}>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant={showFilters ? "light" : "subtle"} color="gray" onClick={onToggleFilters}>
                            <FunnelIcon style={{ width: rem(14), height: rem(14) }} />
                        </ActionIcon>
                    </Group>
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
    )
}