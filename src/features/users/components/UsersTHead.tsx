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

    return (
        <Table.Thead>
            <Table.Tr>
                <Table.Th style={{ width: columnsWidth.avatar }}></Table.Th>
                <Th
                    sortList={sortList}
                    name="firstName"
                    onSort={onSort}
                >
                    First Name
                </Th>
                <Th
                    sortList={sortList}
                    name="lastName"
                    onSort={onSort}
                >
                    Last Name
                </Th>
                <Table.Th>Roles</Table.Th>
                <Th
                    sortList={sortList}
                    name="email"
                    onSort={onSort}
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