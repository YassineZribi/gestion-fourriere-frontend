import { Button, Group, SimpleGrid, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ClearableInput from "../../../../components/ClearableInput";
import ClearableDatePickerInput from "../../../../components/ClearableDatePickerInput";
import Register from "../../../../types/Register";
import SearchableCombobox from "../../../../components/SearchableCombobox";
import registersService from '../../../registers/services'
import sourcesService from '../../../sources/services'
import RegisterSelectOption from "../../../registers/components/RegisterSelectOption";
import Source from "../../../../types/Source";
import SourceSelectOption from "../../../sources/components/SourceSelectOption";
import { arrayToObject } from "../../../../utils/helpers";
import { advancedInputFilterProperties } from "../../../../pages/InputsManagement";
import { useMemo } from "react";

interface Props {
    selectedRegister: Register | null
    selectedSource: Source | null
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function InputsAdvancedFilters({ selectedRegister, selectedSource, filters, hasFilters, onClearFilters, onFilter }: Props) {
    const { t } = useTranslation()
    
    const data = useMemo(() => arrayToObject(advancedInputFilterProperties), []);


    return (
        <>
            <Stack>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <ClearableInput
                            label={"Numéro début"}
                            type="number"
                            variant="default"
                            onChange={(newValue) => onFilter(data.startNumber, newValue)}
                            defaultValue={filters[data.startNumber]}
                        />
                        <ClearableInput
                            label={"Numéro fin"}
                            type="number"
                            variant="default"
                            onChange={(newValue) => onFilter(data.endNumber, newValue)}
                            defaultValue={filters[data.endNumber]}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <ClearableDatePickerInput
                            label={"Date début"}
                            variant="default"
                            onChange={(newValue) => onFilter(data.startDate, newValue?.toISOString() || '')}
                            defaultValue={filters[data.startDate] ? new Date(filters[data.startDate] as string) : undefined}
                        />
                        <ClearableDatePickerInput
                            label={"Date fin"}
                            variant="default"
                            onChange={(newValue) => onFilter(data.endDate, newValue?.toISOString() || '')}
                            defaultValue={filters[data.endDate] ? new Date(filters[data.endDate] as string) : undefined}
                        />
                    </SimpleGrid>
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                    <ClearableInput
                        label={"Description"}
                        variant="default"
                        onChange={(newValue) => onFilter(data.description, newValue)}
                        defaultValue={filters[data.description]}
                    />
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <SearchableCombobox
                            selectedEntity={selectedRegister}
                            label="Register"
                            placeholder={t("labels.noFilter")}
                            onFetch={registersService.getAllRegistersByName}
                            onSelectOption={newRegister => {
                                if (newRegister?.id)
                                    onFilter(data.registerId, newRegister.id.toString())
                            }}
                            onClear={() => {
                                onFilter(data.registerId, "")
                            }}
                            shouldClearOption={!filters[data.registerId]}
                        >
                            {
                                (register) => <RegisterSelectOption register={register} />
                            }
                        </SearchableCombobox>
                        <SearchableCombobox
                            selectedEntity={selectedSource}
                            label="Source"
                            placeholder={t("labels.noFilter")}
                            onFetch={sourcesService.getAllSourcesByName}
                            onSelectOption={newSource => {
                                if (newSource?.id)
                                    onFilter(data.sourceId, newSource.id.toString())
                            }}
                            onClear={() => {
                                onFilter(data.sourceId, "")
                            }}
                            shouldClearOption={!filters[data.sourceId]}
                        >
                            {
                                (source) => <SourceSelectOption source={source} />
                            }
                        </SearchableCombobox>
                    </SimpleGrid>
                </SimpleGrid>
            </Stack>

            <Group justify="flex-end" mt="xl">
                <Button type="button" variant="outline" disabled={!hasFilters} onClick={() => onClearFilters()}>
                    Reset
                </Button>
                <Button type="button" disabled={false} loading={false}>
                    Rechercher
                </Button>
            </Group>
        </>
    )
}