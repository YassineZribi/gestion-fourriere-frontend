
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../../../components/Title';
import articlesService from '../../../../features/articles/services'
import DataTablePagination from '../../../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../../../components/DataTable/DataTableControlPanel';
import THead, { type Th } from '../../../../components/DataTable/THead';
import TBody from '../../../../components/DataTable/TBody';
import DataTable from '../../../../components/DataTable';
import useModal from '../../../../hooks/useModal';
import UpsertArticleModal from '../../../../features/articles/components/UpsertArticleModal';
import ArticleTRow from '../../../../features/articles/components/ArticleTRow';
import ArticlesFilterTRow from '../../../../features/articles/components/ArticlesFilterTRow';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import useFetchArticleFamily from '../../../../features/article-families/hooks/useFetchArticleFamily';
import Article from '../../../../types/Article';
import { thColumns as inheritedThColumns } from '../../../../pages/ArticlesManagement';
import { LINE_SELECTION_COLUMN_WIDTH } from '../../../../utils/constants';
import useFetchWithPaginationUsingState from '../../../../hooks/useFetchWithPaginationUsingState';

const thColumns = [
    {
        style: { width: LINE_SELECTION_COLUMN_WIDTH },
        label: ""
    },
    ...inheritedThColumns
] as const

interface Props {
    selectedArticle: Article | null
    onSelect: (article: Article | null) => void
}

export default function ArticlesSelectionManagement({onSelect, selectedArticle}: Props) {
    const { t } = useTranslation()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: c.label ? tGlossary(`article.${c.label}`) : c.label }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchArticles,
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
        onCreateEntity: onCreateArticle,
        onUpdateEntity: onUpdateArticle,
        onDeleteEntity: onDeleteArticle

    } = useFetchWithPaginationUsingState<Article>(articlesService.getAllArticlesByCriteria);

    const { articleFamily: selectedArticleFamily } = useFetchArticleFamily(getSearchParam('articleFamilyId'))

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            <Title>{tRoot("articlesManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertArticleModal
                            title={t("components.upsertArticleModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateArticle}
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
                                <ArticlesFilterTRow
                                    selectedArticleFamily={selectedArticleFamily}
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    withSelectionColumn
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((article) => (
                                    <ArticleTRow
                                        key={article.id}
                                        article={article}
                                        onSelect={onSelect}
                                        isSelected={selectedArticle?.id === article.id}
                                        hideDeleteBtn
                                        hideUpdateBtn
                                        onUpdateArticle={onUpdateArticle}
                                        onDeleteArticle={onDeleteArticle}
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