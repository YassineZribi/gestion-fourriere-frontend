import { Badge, Table, Text } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { DateTimePicker } from "@mantine/dates"
import { columnsWidth } from "./helpers"
import Output from "../../../../types/Output"
import OutputsActions from "./OutputsActions"
import Sup from "../../../../components/Sup"

interface Props {
    output: Output
    onDeleteOutput: () => void
}

export default function OutputTRow({ output, onDeleteOutput }: Props) {
    const { t: tGlossary } = useTranslation("glossary")

    return (
        <Table.Tr>
            <Table.Td style={{ width: columnsWidth.number }}>
                <Text fz="sm" fw={500} ta={"center"} me="md">
                    {output.number}
                </Text>
            </Table.Td>

            <Table.Td style={{ width: columnsWidth.year }}>
                <Text fz="sm" fw={500}>
                    <span style={{ opacity: 0.6, fontSize: 18 }}>/</span> {output.year}
                </Text>
            </Table.Td>

            <Table.Td>
                    <DateTimePicker
                        variant="unstyled"
                        valueFormat="DD/MM/YYYY - HH:mm"
                        value={new Date(output.dateTime)}
                        readOnly
                    />
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={`${output.totalPaymentAmount}`}>
                    {output.totalPaymentAmount} <Sup>{tGlossary(`currency.tn`)}</Sup>
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={`${output.receiptNumber}`}>
                    {output.receiptNumber}
                </Text>
            </Table.Td>

            <Table.Td style={{ width: columnsWidth.actions }}>
                <OutputsActions
                    selectedOutput={output}
                    onDeleteOutput={onDeleteOutput}
                />
            </Table.Td>
        </Table.Tr>
    )
}