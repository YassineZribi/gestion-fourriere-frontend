import { Anchor, Avatar, Badge, Group, Table, Text } from "@mantine/core"
import EmployeesActions from "./EmployeesActions"
import { ACTIONS_COLUMN_WIDTH, AVATAR_COLUMN_WIDTH } from "../../../utils/constants"
import { getFullResourcePath } from "../../../lib/axios/api"
import Employee from "../../../types/Employee"

const jobColors: Record<string, string> = {
    MANAGER: 'blue',
    OPERATOR: 'cyan',
    ADMIN: 'pink',
};

interface Props {
    employee: Employee
    onUpdateEmployee: () => void
    onDeleteEmployee: () => void
}

export default function EmployeeTRow({ employee, onUpdateEmployee, onDeleteEmployee }: Props) {
    return (
        <Table.Tr>
            <Table.Td style={{ width: AVATAR_COLUMN_WIDTH }}>
                <Avatar
                    size={30}
                    src={employee.photoPath ? getFullResourcePath(employee.photoPath) : ""}
                    radius={30}
                />
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {employee.firstName}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {employee.lastName}
                </Text>
            </Table.Td>

            <Table.Td>
                <Badge /*color={jobColors[user.role.name]}*/ variant="light">
                    {employee.position}
                </Badge>
            </Table.Td>
            <Table.Td>
                {
                    employee.manager
                        ? <Group>
                            <Avatar
                                size={30}
                                src={employee.manager.photoPath ? getFullResourcePath(employee.manager.photoPath) : ""}
                                radius={30}
                            />
                            <Text fz="sm">{employee.manager.firstName + " " + employee.manager.lastName}</Text>
                        </Group>
                        : <Text fz="xl">-</Text>
                }
            </Table.Td>
            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <EmployeesActions
                    selectedEmployee={employee}
                    onUpdateEmployee={onUpdateEmployee}
                    onDeleteEmployee={onDeleteEmployee}
                />
            </Table.Td>
        </Table.Tr>
    )
}