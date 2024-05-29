import { Avatar, Badge, Group, Table, Text } from "@mantine/core"
import { ACTIONS_COLUMN_WIDTH } from "../../../../utils/constants"
import Input from "../../../../types/Input"
import OwnerSelectOption from "../../../owners/shared/components/OwnerSelectOption"
import InputsActions from "./InputsActions"
import { columnsWidth } from "./helpers"
import { formatDateTime } from "../../../../utils/date"

interface Props {
    input: Input
    onDeleteInput: () => void
}

export default function InputTRow({ input, onDeleteInput }: Props) {
    return (
        <Table.Tr>
            <Table.Td style={{ width: columnsWidth.number }}>
                <Text fz="sm" fw={500} ta={"end"} me="md">
                    {input.number}
                </Text>
            </Table.Td>

            <Table.Td style={{ width: columnsWidth.year }}>
                <Text fz="sm" fw={500}>
                    <span style={{opacity: 0.6, fontSize: 18}}>/</span> {input.year}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={400} fs="italic">
                    {formatDateTime(input.dateTime)}
                </Text>
            </Table.Td>

            <Table.Td>
                <Badge c="violet" variant="light" style={{ textTransform: 'initial', maxWidth: "100%" }} title={input.source.name}>{input.source.name}</Badge>
            </Table.Td>

            <Table.Td>
                <OwnerSelectOption owner={input.owner} />
            </Table.Td>
            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <InputsActions
                    selectedInput={input}
                    onDeleteInput={onDeleteInput}
                />
            </Table.Td>
        </Table.Tr>
    )
}