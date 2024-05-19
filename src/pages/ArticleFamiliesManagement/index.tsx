
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import articleFamiliesService from '../../features/article-families/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import useModal from '../../hooks/useModal';
import UpsertArticleFamilyModal from '../../features/article-families/components/UpsertArticleFamilyModal';
import ArticleFamilyTRow from '../../features/article-families/components/ArticleFamilyTRow';
import ArticleFamiliesFilterTRow from '../../features/article-families/components/ArticleFamiliesFilterTRow';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import useFetchRegister from '../../features/registers/hooks/useFetchRegister';
import ArticleFamily from '../../types/ArticleFamily';
import useFetchMeasurementUnit from '../../features/measurement-units/hooks/useFetchMeasurementUnit';

const thColumns = [
    {
        name: "name",
        label: "name"
    },
    // {
    //     label: "description"
    // },
    {
        name: "nightlyAmount",
        label: "nightlyAmount"
    },
    {
        // name: "unitCalculation",
        label: "calculationMethod"
    },
    {
        label: "register"
    },
    {
        label: "measurementUnit"
    }
] as const

export default function ArticleFamiliesManagement() {
    const { t } = useTranslation()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`articleFamily.${c.label}`) }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchArticleFamilies,
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
        onCreateEntity: onCreateArticleFamily,
        onUpdateEntity: onUpdateArticleFamily,
        onDeleteEntity: onDeleteArticleFamily

    } = useFetchWithPagination<ArticleFamily>(articleFamiliesService.getAllArticleFamiliesByCriteria);

    const { register: selectedRegister } = useFetchRegister(getSearchParam('registerId'))
    const { measurementUnit: selectedmeasurementUnit } = useFetchMeasurementUnit(getSearchParam('measurementUnitId'))

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            <Title>{tRoot("articleFamiliesManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertArticleFamilyModal
                            title={t("components.upsertArticleFamilyModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateArticleFamily}
                        />
                    </DataTableControlPanel>
                    <DataTable minWidth={1200}>
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
                                <ArticleFamiliesFilterTRow
                                    selectedRegister={selectedRegister}
                                    selectedMeasurementUnit={selectedmeasurementUnit}
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((articleFamily) => (
                                    <ArticleFamilyTRow
                                        key={articleFamily.id}
                                        articleFamily={articleFamily}
                                        onUpdateArticleFamily={onUpdateArticleFamily}
                                        onDeleteArticleFamily={onDeleteArticleFamily}
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