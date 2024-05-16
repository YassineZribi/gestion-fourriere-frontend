import { Group, Table } from "@mantine/core";
import ClearableInput from "../../../components/ClearableInput";
import ClearFiltersButton from "../../../components/DataTable/ClearFiltersButton";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import registersService from '../../registers/services'
import Register from "../../../types/Register";
import RegisterSelectOption from "../../registers/components/RegisterSelectOption";

interface Props {
    selectedRegister: Register | null
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function SubRegistersFilterTRow({ selectedRegister, filters, hasFilters, onFilter, onClearFilters }: Props) {
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
                    onChange={(newValue) => onFilter("description", newValue)}
                    defaultValue={filters["description"]}
                />
            </Table.Td>
            <Table.Td>
                <SearchableCombobox
                    selectedEntity={selectedRegister}
                    placeholder={t("labels.noFilter")}
                    variant="filled"
                    onFetch={registersService.getAllRegistersByName}
                    onSelectOption={newRegister => {
                        if (newRegister?.id)
                            onFilter("registerId", newRegister.id.toString())
                    }}
                    onClear={() => {
                        onFilter("registerId", "")
                    }}
                    shouldClearOption={!filters["registerId"]}
                >
                    {
                        (register) => <RegisterSelectOption register={register} />
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