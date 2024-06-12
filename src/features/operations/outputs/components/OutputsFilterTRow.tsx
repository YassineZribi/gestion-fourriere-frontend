import { Group, Table } from "@mantine/core";
import ClearableInput from "../../../../components/ClearableInput";
import ClearFiltersButton from "../../../../components/DataTable/ClearFiltersButton";
import ClearableDatePickerInput from "../../../../components/ClearableDatePickerInput";

interface Props {
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function OutputsFilterTRow({ filters, hasFilters, onFilter, onClearFilters }: Props) {
    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <ClearableInput
                        type="number"
                        onChange={(newValue) => onFilter("number", newValue)}
                        defaultValue={filters["number"]}
                    />
                </Table.Td>
                <Table.Td>
                    <ClearableInput
                        type="number"
                        onChange={(newValue) => onFilter("year", newValue)}
                        defaultValue={filters["year"]}
                    />
                </Table.Td>
                <Table.Td>
                    <ClearableDatePickerInput
                        onChange={(newValue) => onFilter("dateTime", newValue?.toISOString() || '')}
                        defaultValue={filters["dateTime"] ? new Date(filters["dateTime"]) : undefined}
                    />
                </Table.Td>
                <Table.Td>
                    <ClearableInput
                        onChange={(newValue) => onFilter("totalPaymentAmount", newValue)}
                        defaultValue={filters["totalPaymentAmount"]}
                        type="number"
                    />
                </Table.Td>
                <Table.Td>
                    <ClearableInput
                        onChange={(newValue) => onFilter("receiptNumber", newValue)}
                        defaultValue={filters["receiptNumber"]}
                        type="number"
                    />
                </Table.Td>
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

        </>
    )
}