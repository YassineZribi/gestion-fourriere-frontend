import { ActionIcon, Anchor, Avatar, Badge, Group, Table, Text, rem } from "@mantine/core"
import Role from "../../../types/Role"
import UsersFilterTRow from "./UsersFilterTRow"
import { ArrowsPointingOutIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { columnsWidth } from "./helpers";
import User from "../../../types/User";
import UsersActions from "./UsersActions";

const jobColors: Record<string, string> = {
    MANAGER: 'blue',
    OPERATOR: 'cyan',
    ADMIN: 'pink',
};

interface Props {
    users: User[]
    filters: { [key: string]: string | undefined }
    filtersAreEmpty: boolean
    showFilters: boolean
    roles: Role[]
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
    onUpdateUser: () => void
    onDeleteUser: () => void
}

export default function UsersTBody({ users, filters, filtersAreEmpty, showFilters, roles, onFilter, onClearFilters, onUpdateUser, onDeleteUser }: Props) {
    const rows = users.map((user) => (
        <Table.Tr key={user.id}>
            <Table.Td style={{ width: columnsWidth.avatar }}>
                <Avatar size={30} src={user.photoPath} radius={30} />
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {user.firstName}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {user.lastName}
                </Text>
            </Table.Td>

            <Table.Td>
                <Badge key={user.role.id} color={jobColors[user.role.name]} variant="light">
                    {user.role.name}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {user.email}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{user.phoneNumber}</Text>
            </Table.Td>
            <Table.Td style={{ width: columnsWidth.actions }}>
                <UsersActions
                    selectedUser={user}
                    onUpdateUser={onUpdateUser}
                    onDeleteUser={onDeleteUser}
                />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.Tbody>
            {
                showFilters && (
                    <UsersFilterTRow
                        filters={filters}
                        filtersAreEmpty={filtersAreEmpty}
                        roles={roles}
                        onFilter={onFilter}
                        onClearFilters={onClearFilters}
                    />
                )
            }
            {rows}
        </Table.Tbody>
    )
}