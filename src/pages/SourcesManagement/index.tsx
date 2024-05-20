
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import sourcesService from '../../features/sources/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import useModal from '../../hooks/useModal';
import UpsertSourceModal from '../../features/sources/components/UpsertSourceModal';
import SourcesFilterTRow from '../../features/sources/components/SourcesFilterTRow';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Source from '../../types/Source';
import SourceTRow from '../../features/sources/components/SourceTRow';
import { columnsWidth } from '../../features/sources/components/helpers';

const thColumns = [
    {
        style: { width: columnsWidth.name },
        name: "name",
        label: "name"
    },
    {
        label: "description"
    }
] as const

export default function SourcesManagement() {
    const { t } = useTranslation()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`source.${c.label}`) }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchSources,
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
        onCreateEntity: onCreateSource,
        onUpdateEntity: onUpdateSource,
        onDeleteEntity: onDeleteSource

    } = useFetchWithPagination<Source>(sourcesService.getAllSourcesByCriteria);

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            <Title>{tRoot("sourcesManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertSourceModal
                            title={t("components.upsertSourceModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateSource}
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
                                <SourcesFilterTRow
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((source) => (
                                    <SourceTRow
                                        key={source.id}
                                        source={source}
                                        onUpdateSource={onUpdateSource}
                                        onDeleteSource={onDeleteSource}
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