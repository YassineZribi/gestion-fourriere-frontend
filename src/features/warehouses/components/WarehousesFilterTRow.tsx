import { Group, Table } from "@mantine/core";
import ClearableInput from "../../../components/ClearableInput";
import ClearFiltersButton from "../../../components/DataTable/ClearFiltersButton";
import Employee from "../../../types/Employee";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import employeesService from '../../employees/services'
import EmployeeSelectOption from "../../employees/components/EmployeeSelectOption";

interface Props {
    selectedManager: Employee | null
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function WarehousesFilterTRow({ selectedManager, filters, hasFilters, onFilter, onClearFilters }: Props) {
    const { t } = useTranslation()

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
                    onChange={(newValue) => onFilter("address", newValue)}
                    defaultValue={filters["address"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    type="number"
                    onChange={(newValue) => onFilter("latitude", newValue)}
                    defaultValue={filters["latitude"]}
                />
            </Table.Td>
            <Table.Td>
                <ClearableInput
                    type="number"
                    onChange={(newValue) => onFilter("longitude", newValue)}
                    defaultValue={filters["longitude"]}
                />
            </Table.Td>
            <Table.Td>
                <SearchableCombobox
                    selectedEntity={selectedManager}
                    placeholder={t("labels.noFilter")}
                    variant="filled"
                    onFetch={employeesService.getAllEmployeesByFullName}
                    onSelectOption={newManager => {
                        if (newManager?.id)
                            onFilter("managerId", newManager.id.toString())
                    }}
                    onClear={() => {
                        onFilter("managerId", "")
                    }}
                    shouldClearOption={!filters["managerId"]}
                >
                    {
                        (employee) => <EmployeeSelectOption employee={employee} />
                    }
                </SearchableCombobox>
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