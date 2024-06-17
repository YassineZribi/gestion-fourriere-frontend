
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import warehousesService from '../../features/warehouses/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import useModal from '../../hooks/useModal';
import Warehouse from '../../types/Warehouse';
import UpsertWarehouseModal from '../../features/warehouses/components/UpsertWarehouseModal';
import useFetchEmployee from '../../features/users/employees/hooks/useFetchEmployee';
import WarehouseTRow from '../../features/warehouses/components/WarehouseTRow';
import WarehousesFilterTRow from '../../features/warehouses/components/WarehousesFilterTRow';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const thColumns = [
    {
        name: "name",
        label: "name"
    },
    {
        name: "address",
        label: "address"
    },
    {
        name: "latitude",
        label: "latitude"
    },
    {
        name: "longitude",
        label: "longitude"
    },
    {
        label: "manager"
    }
] as const

export default function WarehousesManagement() {
    const { t } = useTranslation()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`warehouse.${c.label}`) }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchWarehouses,
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
        onCreateEntity: onCreateWarehouse,
        onUpdateEntity: onUpdateWarehouse,
        onDeleteEntity: onDeleteWarehouse

    } = useFetchWithPagination<Warehouse>(warehousesService.getAllWarehousesByCriteria);

    const { employee: selectedManager } = useFetchEmployee(getSearchParam('managerId'))

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            <Title>{tRoot("warehousesManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertWarehouseModal
                            title={t("components.upsertWarehouseModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateWarehouse}
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
                                <WarehousesFilterTRow
                                    selectedManager={selectedManager}
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((warehouse) => (
                                    <WarehouseTRow
                                        key={warehouse.id}
                                        warehouse={warehouse}
                                        onUpdateWarehouse={onUpdateWarehouse}
                                        onDeleteWarehouse={onDeleteWarehouse}
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