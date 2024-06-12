import { ComboboxItem, Group, Table } from "@mantine/core";
import ClearableInput from "../../../../components/ClearableInput";
import ClearFiltersButton from "../../../../components/DataTable/ClearFiltersButton";
import { useTranslation } from "react-i18next";
import ReadOnlyCombobox from "../../../../components/ReadOnlyCombobox";
import useModal from "../../../../hooks/useModal";
import OwnerSelectOption from "../../../owners/shared/components/OwnerSelectOption";
import OwnerSelectionModal from "../../../owners/shared/components/OwnerSelectionModal";
import Owner from "../../../../types/Owner";
import { useMemo, useState } from "react";
import ClearableDatePickerInput from "../../../../components/ClearableDatePickerInput";
import { processingStatuses as inputStatuses, toCamelCaseStatus } from "../../../../types/ProcessingStatus";
import ClearableSelect from "../../../../components/ClearableSelect";

interface Props {
    selectedOwner: Owner | null
    filters: { [key: string]: string | undefined }
    hasFilters: boolean
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
}

export default function InputsFilterTRow({ selectedOwner, filters, hasFilters, onFilter, onClearFilters }: Props) {
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