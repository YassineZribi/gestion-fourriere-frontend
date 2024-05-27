import { Anchor, Checkbox, Table, Text, useDirection } from "@mantine/core"
import IndividualsActions from "./IndividualsActions"
import { ACTIONS_COLUMN_WIDTH, LINE_SELECTION_COLUMN_WIDTH } from "../../../../utils/constants"
import Individual from "../../../../types/Individual"

interface Props {
    individual: Individual
    isSelected?: boolean
    hideUpdateBtn?: boolean
    hideDeleteBtn?: boolean
    onSelect?: (individual: Individual | null) => void
    onUpdateIndividual: () => void
    onDeleteIndividual: () => void
}

export default function IndividualTRow({ individual, isSelected, hideDeleteBtn, hideUpdateBtn, onSelect, onUpdateIndividual, onDeleteIndividual }: Props) {
    const { dir } = useDirection();

    return (
        <Table.Tr
            bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}
        >
            {
                onSelect && (
                    <Table.Td style={{ width: LINE_SELECTION_COLUMN_WIDTH }}>
                        <Checkbox
                            aria-label="Select individual"
                            checked={isSelected}
                            onChange={(event) => onSelect(event.currentTarget.checked ? individual : null)}
                        />
                    </Table.Td>
                )
            }
            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={individual.firstName}>
                    {individual.firstName}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={individual.lastName}>
                    {individual.lastName}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={individual.nationalId}>
                    {individual.nationalId}
                </Text>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {individual.email}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" dir="ltr" style={{ textAlign: dir === 'rtl' ? 'end' : 'start' }}>{individual.phoneNumber}</Text>
            </Table.Td>

            {/* <Table.Td>
                {
                    individual.address
                    ? <Text fz="sm" fw={500} truncate="end" title={individual.address}>{individual.address}</Text>
                    : <Text fz="xl">-</Text>
                }
            </Table.Td> */}

            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <IndividualsActions
                    selectedIndividual={individual}
                    hideUpdateBtn={hideUpdateBtn}
                    hideDeleteBtn={hideDeleteBtn}
                    onUpdateIndividual={onUpdateIndividual}
                    onDeleteIndividual={onDeleteIndividual}
                />
            </Table.Td>
        </Table.Tr>
    )
}