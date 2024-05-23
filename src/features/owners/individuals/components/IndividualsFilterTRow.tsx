import { Group, Table } from "@mantine/core";
import ClearableInput from "../../../../components/ClearableInput";
import ClearFiltersButton from "../../../../components/DataTable/ClearFiltersButton";

interface Props {
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function IndividualsFilterTRow({ filters, hasFilters, onFilter, onClearFilters }: Props) {

    return (
        <Table.Tr>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("firstName", newValue)}
                    defaultValue={filters["firstName"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("lastName", newValue)}
                    defaultValue={filters["lastName"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("nationalId", newValue)}
                    defaultValue={filters["nationalId"]}
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