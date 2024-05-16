
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import registersService from '../../features/registers/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import useModal from '../../hooks/useModal';
import UpsertRegisterModal from '../../features/registers/components/UpsertRegisterModal';
import RegistersFilterTRow from '../../features/registers/components/RegistersFilterTRow';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Register from '../../types/Register';
import RegisterTRow from '../../features/registers/components/RegisterTRow';
import { columnsWidth } from '../../features/registers/components/helpers';

const thColumns = [
    {
        style: { width: columnsWidth.name },
        name: "name",
        label: "name"
    },
    {
        label: "observation"
    }
] as const

export default function RegistersManagement() {
    const { t } = useTranslation()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`register.${c.label}`) }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchRegisters,
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
        onCreateEntity: onCreateRegister,
        onUpdateEntity: onUpdateRegister,
        onDeleteEntity: onDeleteRegister

    } = useFetchWithPagination<Register>(registersService.getAllRegistersByCriteria);

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            <Title>{tRoot("registersManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertRegisterModal
                            title={t("components.upsertRegisterModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateRegister}
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
                                <RegistersFilterTRow
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((register) => (
                                    <RegisterTRow
                                        key={register.id}
                                        register={register}
                                        onUpdateRegister={onUpdateRegister}
                                        onDeleteRegister={onDeleteRegister}
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