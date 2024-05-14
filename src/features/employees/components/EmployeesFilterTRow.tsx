import { Group, Table } from "@mantine/core";
import ClearableInput from "../../../components/ClearableInput";
import ClearFiltersButton from "../../../components/DataTable/ClearFiltersButton";
import Employee from "../../../types/Employee";
import employeesService from '../services'
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import EmployeeSelectOption from "./EmployeeSelectOption";

interface Props {
    selectedManager: Employee | null
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function EmployeesFilterTRow({ selectedManager, filters, hasFilters, onFilter, onClearFilters }: Props) {
    const { t } = useTranslation()

    return (
        <Table.Tr>
            <Table.Td></Table.Td>
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
                    onChange={(newValue) => onFilter("position", newValue)}
                    defaultValue={filters["position"]}
                />
            </Table.Td>
            <Table.Td>
                <SearchableCombobox
                    selectedEntity={selectedManager}
                    placeholder={t("labels.noFilter")}
                    variant="filled"
                    onSelectOption={newManager => {
                        if (newManager?.id)
                        onFilter("managerId", newManager.id.toString())
                    }}
                    onFetch={employeesService.getAllEmployeesByFullName}
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