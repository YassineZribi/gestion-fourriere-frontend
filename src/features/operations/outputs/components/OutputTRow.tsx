import { ActionIcon, Badge, Box, Collapse, Table, Text } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { DateTimePicker } from "@mantine/dates"
import { columnsWidth } from "./helpers"
import Output from "../../../../types/Output"
import OutputsActions from "./OutputsActions"
import Sup from "../../../../components/Sup"
import { EXPANDING_ROW_COLUMN_WIDTH } from "../../../../utils/constants"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useDisclosure } from "@mantine/hooks"
import { useRef } from "react"

interface Props {
    output: Output
    onDeleteOutput: () => void
}

export default function OutputTRow({ output, onDeleteOutput }: Props) {
    const { t: tGlossary } = useTranslation("glossary")

    const [opened, { toggle }] = useDisclosure(false);

    const trRef = useRef<HTMLTableRowElement>(null)

    return (
        <>
            <Table.Tr ref={trRef}>
                <Table.Td style={{ width: EXPANDING_ROW_COLUMN_WIDTH }}>
                    <ActionIcon variant="transparent" aria-label="Expand row" onClick={toggle}>
                        <ChevronDownIcon style={{ rotate: opened ? '180deg' : undefined, width: '70%', height: '70%', transition: 'rotate 0.3s' }} />
                    </ActionIcon>
                </Table.Td>
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
            <Table.Tr
                style={{background: trRef.current ? getComputedStyle(trRef.current).background : 'red'}}
            >
                <Table.Td p={0} colSpan={7}>
                    <Collapse in={opened}>
                        <Box px={10} py={12}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Box>
                    </Collapse>
                </Table.Td>
            </Table.Tr>
            <Table.Tr></Table.Tr>
        </>
    )
}