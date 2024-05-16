
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import subRegistersService from '../../features/sub-registers/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import useModal from '../../hooks/useModal';
import UpsertSubRegisterModal from '../../features/sub-registers/components/UpsertSubRegisterModal';
import SubRegisterTRow from '../../features/sub-registers/components/SubRegisterTRow';
import SubRegistersFilterTRow from '../../features/sub-registers/components/SubRegistersFilterTRow';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import SubRegister from '../../types/SubRegister';
import useFetchRegister from '../../features/registers/hooks/useFetchRegister';
import { columnsWidth } from '../../features/sub-registers/components/helpers';

const thColumns = [
    {
        style: { width: columnsWidth.name },
        name: "name",
        label: "name"
    },
    {
        label: "description"
    },
    {
        style: { width: columnsWidth.register },
        label: "register"
    }
] as const

export default function SubRegistersManagement() {
    const { t } = useTranslation()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`subRegister.${c.label}`) }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchSubRegisters,
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
        onCreateEntity: onCreateSubRegister,
        onUpdateEntity: onUpdateSubRegister,
        onDeleteEntity: onDeleteSubRegister

    } = useFetchWithPagination<SubRegister>(subRegistersService.getAllSubRegistersByCriteria);

    const { register: selectedRegister } = useFetchRegister(getSearchParam('registerId'))

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            <Title>{tRoot("subRegistersManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertSubRegisterModal
                            title={t("components.upsertSubRegisterModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateSubRegister}
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
                                <SubRegistersFilterTRow
                                    selectedRegister={selectedRegister}
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((subRegister) => (
                                    <SubRegisterTRow
                                        key={subRegister.id}
                                        subRegister={subRegister}
                                        onUpdateSubRegister={onUpdateSubRegister}
                                        onDeleteSubRegister={onDeleteSubRegister}
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