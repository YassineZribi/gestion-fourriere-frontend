import { Anchor, Checkbox, Table, Text, useDirection } from "@mantine/core"
import CompaniesActions from "./CompaniesActions"
import { ACTIONS_COLUMN_WIDTH, LINE_SELECTION_COLUMN_WIDTH } from "../../../../utils/constants"
import Company from "../../../../types/Company"

interface Props {
    company: Company
    isSelected?: boolean
    hideUpdateBtn?: boolean
    hideDeleteBtn?: boolean
    onSelect?: (company: Company | null) => void
    onUpdateCompany: () => void
    onDeleteCompany: () => void
}

export default function CompanyTRow({ company, isSelected, hideDeleteBtn, hideUpdateBtn, onSelect, onUpdateCompany, onDeleteCompany }: Props) {
    const { dir } = useDirection();

    return (
        <Table.Tr
            bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}
        >
            {
                onSelect && (
                    <Table.Td style={{ width: LINE_SELECTION_COLUMN_WIDTH }}>
                        <Checkbox
                            aria-label="Select company"
                            checked={isSelected}
                            onChange={(event) => onSelect(event.currentTarget.checked ? company : null)}
                        />
                    </Table.Td>
                )
            }
            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={company.name}>
                    {company.name}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500} truncate="end" title={company.taxId}>
                    {company.taxId}
                </Text>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {company.email}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" dir="ltr" style={{ textAlign: dir === 'rtl' ? 'end' : 'start' }}>{company.phoneNumber}</Text>
            </Table.Td>

            {/* <Table.Td>
                {
                    company.address
                    ? <Text fz="sm" fw={500} truncate="end" title={company.address}>{company.address}</Text>
                    : <Text fz="xl">-</Text>
                }
            </Table.Td> */}

            <Table.Td style={{ width: ACTIONS_COLUMN_WIDTH }}>
                <CompaniesActions
                    selectedCompany={company}
                    hideUpdateBtn={hideUpdateBtn}
                    hideDeleteBtn={hideDeleteBtn}
                    onUpdateCompany={onUpdateCompany}
                    onDeleteCompany={onDeleteCompany}
                />
            </Table.Td>
        </Table.Tr>
    )
}