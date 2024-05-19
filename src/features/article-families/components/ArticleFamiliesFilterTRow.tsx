import { ComboboxItem, Group, Table } from "@mantine/core";
import ClearableInput from "../../../components/ClearableInput";
import ClearFiltersButton from "../../../components/DataTable/ClearFiltersButton";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../components/SearchableCombobox";
import registersService from '../../registers/services'
import measurementUnitsService from '../../measurement-units/services'
import Register from "../../../types/Register";
import RegisterSelectOption from "../../registers/components/RegisterSelectOption";
import MeasurementUnit from "../../../types/MeasurementUnit";
import MeasurementUnitSelectOption from "../../measurement-units/components/MeasurementUnitSelectOption";
import { useMemo } from "react";
import ClearableSelect from "../../../components/ClearableSelect";
import { calculationMethods } from "./helpers";
import { capitalize } from "../../../utils/helpers";

interface Props {
    selectedRegister: Register | null
    selectedMeasurementUnit: MeasurementUnit | null
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function ArticleFamiliesFilterTRow({ selectedRegister, selectedMeasurementUnit, filters, hasFilters, onFilter, onClearFilters }: Props) {
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")
    const calculationMethodsWithTranslation: ComboboxItem[] = useMemo(() => calculationMethods.map(method => ({
        value: String(method.value),
        label: capitalize(tGlossary(`calculationMethods.${method.label}`))
    })), [tGlossary])

    return (
        <Table.Tr>
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("name", newValue)}
                    defaultValue={filters["name"]}
                />
            </Table.Td>
            {/* <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("description", newValue)}
                    defaultValue={filters["description"]}
                />
            </Table.Td> */}
            <Table.Td>
                <ClearableInput
                    onChange={(newValue) => onFilter("nightlyAmount", newValue)}
                    defaultValue={filters["nightlyAmount"]}
                    type="number"
                />
            </Table.Td>
            <Table.Td>
                <ClearableSelect
                    data={calculationMethodsWithTranslation}
                    defaultValue={calculationMethodsWithTranslation.find(option => option.value === filters["unitCalculation"])}
                    onChange={(newValue) => onFilter("unitCalculation", newValue)}
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
                <SearchableCombobox
                    selectedEntity={selectedMeasurementUnit}
                    placeholder={t("labels.noFilter")}
                    variant="filled"
                    onFetch={measurementUnitsService.getAllMeasurementUnitsByNameOrSymbol}
                    onSelectOption={newMeasurementUnit => {
                        if (newMeasurementUnit?.id)
                            onFilter("measurementUnitId", newMeasurementUnit.id.toString())
                    }}
                    onClear={() => {
                        onFilter("measurementUnitId", "")
                    }}
                    shouldClearOption={!filters["measurementUnitId"]}
                >
                    {
                        (measurementUnit) => <MeasurementUnitSelectOption measurementUnit={measurementUnit} />
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