import { Anchor, Avatar, Badge, Table, Text, useDirection } from "@mantine/core"
import User from "../../../types/User"
import UsersActions from "./UsersActions"
import { ACTIONS_COLUMN_WIDTH, AVATAR_COLUMN_WIDTH } from "../../../utils/constants"
import { getFullResourcePath } from "../../../lib/axios/api"
import { useTranslation } from "react-i18next"
import { RoleNameLowercase } from "../../../types/Role"

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
    const { dir } = useDirection();
    const { t: tGlossary } = useTranslation("glossary")

    return (
        <Table.Tr>
            <Table.Td style={{ width: AVATAR_COLUMN_WIDTH }}>
                <Avatar
                    size={30}
                    src={user.photoPath ? getFullResourcePath(user.photoPath) : ""}
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
                <Badge color={jobColors[user.role.name]} variant="light">
                    {tGlossary(`roles.${user.role.name.toLowerCase() as RoleNameLowercase}`)}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {user.email}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" dir="ltr" style={{textAlign: dir === 'rtl' ? 'end' : 'start'}}>{user.phoneNumber}</Text>
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