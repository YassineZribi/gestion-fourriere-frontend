import { Group, Table } from "@mantine/core";
import ClearableInput from "../../../../components/ClearableInput";
import ClearFiltersButton from "../../../../components/DataTable/ClearFiltersButton";
import { LINE_SELECTION_COLUMN_WIDTH } from "../../../../utils/constants";

interface Props {
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    withSelectionColumn?: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function CompaniesFilterTRow({ filters, hasFilters, withSelectionColumn = false, onFilter, onClearFilters }: Props) {

    return (
        <Table.Tr>
            {withSelectionColumn && (
                <Table.Td style={{ width: LINE_SELECTION_COLUMN_WIDTH }}></Table.Td>
            )}
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("name", newValue)}
                    defaultValue={filters["name"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("taxId", newValue)}
                    defaultValue={filters["taxId"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("email", newValue)}
                    defaultValue={filters["email"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("phoneNumber", newValue)}
                    defaultValue={filters["phoneNumber"]}
                />
            </Table.Td>
            {/* <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("address", newValue)}
                    defaultValue={filters["address"]}
                />
            </Table.Td> */}
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    {
                        hasFilters && (
                            <ClearFiltersButton
                                onClick={onClearFilters}
                            />
                        )
                    }
                </Group>
            </Table.Td>
        </Table.Tr>
    )
}