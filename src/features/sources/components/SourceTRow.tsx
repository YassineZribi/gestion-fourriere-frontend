import { Table, Text } from "@mantine/core"
import SourcesActions from "./SourcesActions"
import { ACTIONS_COLUMN_WIDTH } from "../../../utils/constants"
import { columnsWidth } from "./helpers"
import Source from "../../../types/Source"

interface Props {
    source: Source
    onUpdateSource: () => void
    onDeleteSource: () => void
}

export default function SourceTRow({ source, onUpdateSource, onDeleteSource }: Props) {
    return (
        <Table.Tr>
            <Table.Td style={{ width: columnsWidth.name }}>
                <Text fz="sm" fw={500} truncate="end" title={source.name}>
                    {source.name}
                </Text>
            </Table.Td>

            <Table.Td>
                {
                    source.description
                    ? <Text fz="sm" fw={500} truncate="end" title={source.description}>{source.description}</Text>
                    : <Text fz="xl">-</Text>
                }
            </Table.Td>

            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <SourcesActions
                    selectedSource={source}
                    onUpdateSource={onUpdateSource}
                    onDeleteSource={onDeleteSource}
                />
            </Table.Td>
        </Table.Tr>
    )
}