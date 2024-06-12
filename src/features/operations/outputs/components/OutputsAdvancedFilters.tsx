import { Button, Group, SimpleGrid, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ClearableInput from "../../../../components/ClearableInput";
import ClearableDatePickerInput from "../../../../components/ClearableDatePickerInput";
import { arrayToObject } from "../../../../utils/helpers";
import { advancedOutputFilterProperties } from "../../../../pages/OutputsManagement";
import { useMemo } from "react";

interface Props {
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function OutputsAdvancedFilters({ filters, hasFilters, onClearFilters, onFilter }: Props) {
    const { t } = useTranslation()
    
    const data = useMemo(() => arrayToObject(advancedOutputFilterProperties), []);


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
                {/* <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                    ...
                </SimpleGrid> */}
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