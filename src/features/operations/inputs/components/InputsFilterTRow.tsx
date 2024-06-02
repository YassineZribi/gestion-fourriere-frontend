import { ComboboxItem, Group, Table } from "@mantine/core";
import ClearableInput from "../../../../components/ClearableInput";
import ClearFiltersButton from "../../../../components/DataTable/ClearFiltersButton";
import { useTranslation } from "react-i18next";
import SearchableCombobox from "../../../../components/SearchableCombobox";
import sourcesService from '../../../sources/services'
import ReadOnlyCombobox from "../../../../components/ReadOnlyCombobox";
import useModal from "../../../../hooks/useModal";
import OwnerSelectOption from "../../../owners/shared/components/OwnerSelectOption";
import OwnerSelectionModal from "./OwnerSelectionModal";
import Owner from "../../../../types/Owner";
import Source from "../../../../types/Source";
import SourceSelectOption from "../../../sources/components/SourceSelectOption";
import { useMemo, useState } from "react";
import ClearableDatePickerInput from "../../../../components/ClearableDatePickerInput";
import { inputStatuses, toCamelCaseStatus } from "../../../../types/InputStatus";
import ClearableSelect from "../../../../components/ClearableSelect";

interface Props {
    selectedSource: Source | null
    selectedOwner: Owner | null
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function InputsFilterTRow({ selectedSource, selectedOwner, filters, hasFilters, onFilter, onClearFilters }: Props) {
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")
    const inputStatusesFilteringData: ComboboxItem[] = useMemo(() => inputStatuses.map(status => ({
        value: status,
        label: tGlossary(`inputStatuses.${toCamelCaseStatus(status)}`)
    })), [tGlossary])

    const inputStatusDefaultValue = useMemo(() => inputStatusesFilteringData.find(option => option.value === filters["status"]), [inputStatusesFilteringData, filters])

    const [owner, setOwner] = useState(selectedOwner ?? null)
    const [isOwnerSelectionModalOpen, { open: openOwnerSelectionModal, close: closeOwnerSelectionModal }] = useModal()

    const updateOwner = (newOwner: Owner | null) => {
        console.log(newOwner);
        setOwner(newOwner)
        if (newOwner?.id)
            onFilter("ownerId", newOwner.id.toString())
    }

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
                    <SearchableCombobox
                        selectedEntity={selectedSource}
                        placeholder={t("labels.noFilter")}
                        variant="filled"
                        onFetch={sourcesService.getAllSourcesByName}
                        onSelectOption={newSource => {
                            if (newSource?.id)
                                onFilter("sourceId", newSource.id.toString())
                        }}
                        onClear={() => {
                            onFilter("sourceId", "")
                        }}
                        shouldClearOption={!filters["sourceId"]}
                    >
                        {
                            (source) => <SourceSelectOption source={source} />
                        }
                    </SearchableCombobox>
                </Table.Td>
                <Table.Td>
                    <ReadOnlyCombobox
                        selectedEntity={owner}
                        placeholder={t("labels.noFilter")}
                        variant="filled"
                        onClear={() => {
                            setOwner(null)
                            onFilter("ownerId", "")
                        }}
                        onClick={openOwnerSelectionModal}
                        shouldClearOption={!filters["ownerId"]}
                    >
                        {
                            (owner) => <OwnerSelectOption owner={owner} />
                        }
                    </ReadOnlyCombobox>
                </Table.Td>
                <Table.Td>
                    <ClearableSelect
                        data={inputStatusesFilteringData}
                        defaultValue={inputStatusDefaultValue}
                        title={inputStatusDefaultValue?.label}
                        onChange={(newValue) => onFilter("status", newValue)}
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

            <OwnerSelectionModal
                title={"Select owner"}
                isOpened={isOwnerSelectionModalOpen}
                onClose={closeOwnerSelectionModal}
                onSubmit={updateOwner}
            />
        </>
    )
}