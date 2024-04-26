import { Anchor, Avatar, Badge, Table, Text } from "@mantine/core"
import User from "../../../types/User"
import UsersActions from "./UsersActions"
import { ACTIONS_COLUMN_WIDTH } from "../../../utils/constants"
import usersService from '../services/users'
import { columnsWidth } from "./helpers"

const jobColors: Record<string, string> = {
    MANAGER: 'blue',
    OPERATOR: 'cyan',
    ADMIN: 'pink',
};

interface Props {
    user: User
    onUpdateUser: () => void
    onDeleteUser: () => void
}

export default function UserTRow({ user, onUpdateUser, onDeleteUser }: Props) {
    return (
        <Table.Tr>
            <Table.Td style={{ width: columnsWidth.avatar }}>
                <Avatar
                    size={30}
                    src={user.photoPath ? usersService.getFullPhotoPath(user.photoPath) : ""}
                    radius={30}
                />
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
            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <UsersActions
                    selectedUser={user}
                    onUpdateUser={onUpdateUser}
                    onDeleteUser={onDeleteUser}
                />
            </Table.Td>
        </Table.Tr>
    )
}