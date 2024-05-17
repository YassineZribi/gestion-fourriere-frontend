import { Badge, Table, Text } from "@mantine/core"
import MeasurementUnitsActions from "./MeasurementUnitsActions"
import { ACTIONS_COLUMN_WIDTH } from "../../../utils/constants"
import MeasurementUnit from "../../../types/MeasurementUnit"

interface Props {
    measurementUnit: MeasurementUnit
    onUpdateMeasurementUnit: () => void
    onDeleteMeasurementUnit: () => void
}

export default function MeasurementUnitTRow({ measurementUnit, onUpdateMeasurementUnit, onDeleteMeasurementUnit }: Props) {
    return (
        <Table.Tr>
            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={measurementUnit.name}>
                    {measurementUnit.name}
                </Text>
            </Table.Td>

            <Table.Td>
                <Badge style={{ textTransform: 'initial', maxWidth: "100%" }} title={measurementUnit.symbol}>{measurementUnit.symbol}</Badge>
            </Table.Td>

            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <MeasurementUnitsActions
                    selectedMeasurementUnit={measurementUnit}
                    onUpdateMeasurementUnit={onUpdateMeasurementUnit}
                    onDeleteMeasurementUnit={onDeleteMeasurementUnit}
                />
            </Table.Td>
        </Table.Tr>
    )
}