
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import measurementUnitsService from '../../features/measurement-units/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import useModal from '../../hooks/useModal';
import UpsertMeasurementUnitModal from '../../features/measurement-units/components/UpsertMeasurementUnitModal';
import MeasurementUnitsFilterTRow from '../../features/measurement-units/components/MeasurementUnitsFilterTRow';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import MeasurementUnit from '../../types/MeasurementUnit';
import MeasurementUnitTRow from '../../features/measurement-units/components/MeasurementUnitTRow';

const thColumns = [
    {
        name: "name",
        label: "name"
    },
    {
        name: "symbol",
        label: "symbol"
    }
] as const

export default function MeasurementUnitsManagement() {
    const { t } = useTranslation()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`measurementUnit.${c.label}`) }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchMeasurementUnits,
        handleSort,
        handleFilter,
        showFilters,
        toggleFilters,
        handleClearFilters,
        hasFilters,
        setPageParam,
        getSearchParam,
        getFilterParams,
        getSortList,
        onCreateEntity: onCreateMeasurementUnit,
        onUpdateEntity: onUpdateMeasurementUnit,
        onDeleteEntity: onDeleteMeasurementUnit

    } = useFetchWithPagination<MeasurementUnit>(measurementUnitsService.getAllMeasurementUnitsByCriteria);

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            <Title>{tRoot("measurementUnitsManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertMeasurementUnitModal
                            title={t("components.upsertMeasurementUnitModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateMeasurementUnit}
                        />
                    </DataTableControlPanel>
                    <DataTable>
                        <THead
                            columns={thColumnsWithTranslation}
                            sortList={getSortList()}
                            showFilters={showFilters}
                            onSort={handleSort}
                            onToggleFilters={toggleFilters}
                        />
                        <TBody
                            showFilters={showFilters}
                            filterRow={
                                <MeasurementUnitsFilterTRow
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((measurementUnit) => (
                                    <MeasurementUnitTRow
                                        key={measurementUnit.id}
                                        measurementUnit={measurementUnit}
                                        onUpdateMeasurementUnit={onUpdateMeasurementUnit}
                                        onDeleteMeasurementUnit={onDeleteMeasurementUnit}
                                    />
                                ))
                            }
                        </TBody>
                    </DataTable>
                    <DataTablePagination
                        onChange={setPageParam}
                        currentPage={responseData.pageable.pageNumber + 1}
                        totalPages={responseData.totalPages}
                        totalEntities={responseData.totalElements}
                        numberOfEntitiesInCurrentPage={responseData.numberOfElements}
                        skippedEntities={responseData.pageable.offset}
                        isFetching={isLoading}
                    />
                </>
            )}
        </div>
    );
}