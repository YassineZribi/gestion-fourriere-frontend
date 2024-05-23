import { Anchor, Table, Text, useDirection } from "@mantine/core"
import IndividualsActions from "./IndividualsActions"
import { ACTIONS_COLUMN_WIDTH } from "../../../../utils/constants"
import Individual from "../../../../types/Individual"

interface Props {
    individual: Individual
    onUpdateIndividual: () => void
    onDeleteIndividual: () => void
}

export default function IndividualTRow({ individual, onUpdateIndividual, onDeleteIndividual }: Props) {
    const { dir } = useDirection();

    return (
        <Table.Tr>
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
                <Text fz="sm" dir="ltr" style={{textAlign: dir === 'rtl' ? 'end' : 'start'}}>{individual.phoneNumber}</Text>
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
                    onUpdateIndividual={onUpdateIndividual}
                    onDeleteIndividual={onDeleteIndividual}
                />
            </Table.Td>
        </Table.Tr>
    )
}