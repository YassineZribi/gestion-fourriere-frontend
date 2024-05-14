import { Avatar, Badge, Group, Table, Text } from "@mantine/core"
import WarehousesActions from "./WarehousesActions"
import { ACTIONS_COLUMN_WIDTH } from "../../../utils/constants"
import { getFullResourcePath } from "../../../lib/axios/api"
import Warehouse from "../../../types/Warehouse"

const coordsolors = {
    LATITUDE: 'cyan',
    LONGITUDE: 'blue',
} as const;

interface Props {
    warehouse: Warehouse
    onUpdateWarehouse: () => void
    onDeleteWarehouse: () => void
}

export default function WarehouseTRow({ warehouse, onUpdateWarehouse, onDeleteWarehouse }: Props) {
    return (
        <Table.Tr>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {warehouse.name}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {warehouse.address}
                </Text>
            </Table.Td>

            <Table.Td>
                <Badge color={coordsolors.LATITUDE} variant="light">
                    {warehouse.latitude}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge color={coordsolors.LONGITUDE} variant="light">
                    {warehouse.longitude}
                </Badge>
            </Table.Td>
            <Table.Td>
                {
                    warehouse.manager
                        ? <Group>
                            <Avatar
                                size={30}
                                src={warehouse.manager.photoPath ? getFullResourcePath(warehouse.manager.photoPath) : ""}
                                radius={30}
                            />
                            <Text fz="sm">{warehouse.manager.firstName + " " + warehouse.manager.lastName}</Text>
                        </Group>
                        : <Text fz="xl">-</Text>
                }
            </Table.Td>
            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <WarehousesActions
                    selectedWarehouse={warehouse}
                    onUpdateWarehouse={onUpdateWarehouse}
                    onDeleteWarehouse={onDeleteWarehouse}
                />
            </Table.Td>
        </Table.Tr>
    )
}