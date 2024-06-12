import { Badge, DefaultMantineColor, Table, Text } from "@mantine/core"
import Input from "../../../../types/Input"
import OwnerSelectOption from "../../../owners/shared/components/OwnerSelectOption"
import InputsActions from "./InputsActions"
import { ProcessingStatusCamelCase, toCamelCaseStatus } from "../../../../types/ProcessingStatus"
import { useTranslation } from "react-i18next"
import { DateTimePicker } from "@mantine/dates"
import { columnsWidth } from "./helpers"

const inputStatusColors: Record<ProcessingStatusCamelCase, DefaultMantineColor> = {
    fullyOut: 'teal',
    partiallyOut: 'yellow',
    fullyIn: 'red',
};

interface Props {
    input: Input
    onDeleteInput: () => void
}

export default function InputTRow({ input, onDeleteInput }: Props) {
    const { t: tGlossary } = useTranslation("glossary")

    return (
        <Table.Tr>
            <Table.Td style={{ width: columnsWidth.number }}>
                <Text fz="sm" fw={500} ta={"center"} me="md">
                    {input.number}
                </Text>
            </Table.Td>

            <Table.Td style={{ width: columnsWidth.year }}>
                <Text fz="sm" fw={500}>
                    <span style={{ opacity: 0.6, fontSize: 18 }}>/</span> {input.year}
                </Text>
            </Table.Td>

            <Table.Td>
                    <DateTimePicker
                        variant="unstyled"
                        valueFormat="DD/MM/YYYY - HH:mm"
                        value={new Date(input.dateTime)}
                        readOnly
                    />
            </Table.Td>

            <Table.Td>
                <OwnerSelectOption owner={input.owner} />
            </Table.Td>

            <Table.Td>
                <Badge tt="none" color={inputStatusColors[toCamelCaseStatus(input.status)]} variant="light">
                    {tGlossary(`inputStatuses.${toCamelCaseStatus(input.status)}`)}
                </Badge>
            </Table.Td>

            <Table.Td style={{ width: columnsWidth.actions }}>
                <InputsActions
                    selectedInput={input}
                    onDeleteInput={onDeleteInput}
                />
            </Table.Td>
        </Table.Tr>
    )
}