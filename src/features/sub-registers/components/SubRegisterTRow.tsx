import { Badge, Table, Text } from "@mantine/core"
import SubRegistersActions from "./SubRegistersActions"
import { ACTIONS_COLUMN_WIDTH } from "../../../utils/constants"
import SubRegister from "../../../types/SubRegister"
import { columnsWidth } from "./helpers";

interface Props {
    subRegister: SubRegister
    onUpdateSubRegister: () => void
    onDeleteSubRegister: () => void
}

export default function SubRegisterTRow({ subRegister, onUpdateSubRegister, onDeleteSubRegister }: Props) {
    return (
        <Table.Tr>
            <Table.Td style={{ width: columnsWidth.name }}>
                <Text fz="sm" fw={500} truncate="end" title={subRegister.name}>
                    {subRegister.name}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={subRegister.description}>
                    {subRegister.description}
                </Text>
            </Table.Td>

            <Table.Td style={{ width: columnsWidth.register }}>
                {
                    subRegister.register
                        ? <Badge variant="light" style={{textTransform: 'initial', maxWidth: "100%"}} title={subRegister.register.name}>{subRegister.register.name}</Badge>
                        : <Text fz="xl">-</Text>
                }
            </Table.Td>
            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <SubRegistersActions
                    selectedSubRegister={subRegister}
                    onUpdateSubRegister={onUpdateSubRegister}
                    onDeleteSubRegister={onDeleteSubRegister}
                />
            </Table.Td>
        </Table.Tr>
    )
}