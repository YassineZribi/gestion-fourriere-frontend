import { Table, Text } from "@mantine/core"
import RegistersActions from "./RegistersActions"
import { ACTIONS_COLUMN_WIDTH } from "../../../utils/constants"
import Register from "../../../types/Register"
import { columnsWidth } from "./helpers"

interface Props {
    register: Register
    onUpdateRegister: () => void
    onDeleteRegister: () => void
}

export default function RegisterTRow({ register, onUpdateRegister, onDeleteRegister }: Props) {
    return (
        <Table.Tr>
            <Table.Td style={{ width: columnsWidth.name }}>
                <Text fz="sm" fw={500} truncate="end" title={register.name}>
                    {register.name}
                </Text>
            </Table.Td>

            <Table.Td>
                {
                    register.observation
                    ? <Text fz="sm" fw={500} truncate="end" title={register.observation}>{register.observation}</Text>
                    : <Text fz="xl">-</Text>
                }
            </Table.Td>

            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <RegistersActions
                    selectedRegister={register}
                    onUpdateRegister={onUpdateRegister}
                    onDeleteRegister={onDeleteRegister}
                />
            </Table.Td>
        </Table.Tr>
    )
}