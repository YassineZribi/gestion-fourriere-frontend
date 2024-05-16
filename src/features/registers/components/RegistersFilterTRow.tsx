import { Group, Table } from "@mantine/core";
import ClearableInput from "../../../components/ClearableInput";
import ClearFiltersButton from "../../../components/DataTable/ClearFiltersButton";

interface Props {
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function RegistersFilterTRow({ filters, hasFilters, onFilter, onClearFilters }: Props) {

    return (
        <Table.Tr>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("name", newValue)}
                    defaultValue={filters["name"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("observation", newValue)}
                    defaultValue={filters["observation"]}
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
    )
}