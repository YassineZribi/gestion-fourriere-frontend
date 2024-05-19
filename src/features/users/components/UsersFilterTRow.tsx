import { ComboboxItem, Group, Table } from "@mantine/core";
import ClearableInput from "../../../components/ClearableInput";
import ClearableSelect from "../../../components/ClearableSelect";
import useRolesStore from "../../../store/useRolesStore";
import ClearFiltersButton from "../../../components/DataTable/ClearFiltersButton";
import { useTranslation } from "react-i18next";
import { RoleNameLowercase } from "../../../types/Role";
import { useMemo } from "react";

interface Props {
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function UsersFilterTRow({ filters, hasFilters, onFilter, onClearFilters }: Props) {
    const { roles } = useRolesStore()
    const { t: tGlossary } = useTranslation("glossary")
    const rolesFilteringData: ComboboxItem[] = useMemo(() => roles.map(role => ({
        value: role.name.toLowerCase(),
        label: tGlossary(`roles.${role.name.toLowerCase() as RoleNameLowercase}`).toUpperCase()
    })), [tGlossary])

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
                <ClearableSelect
                    data={rolesFilteringData}
                    defaultValue={rolesFilteringData.find(option => option.value === filters["roleName"])}
                    onChange={(newValue) => onFilter("roleName", newValue)}
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