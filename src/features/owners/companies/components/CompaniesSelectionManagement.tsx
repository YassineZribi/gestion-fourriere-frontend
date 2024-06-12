
import { Center, Loader } from '@mantine/core';
import companiesService from '../services'
import DataTablePagination from '../../../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../../../components/DataTable/DataTableControlPanel';
import THead, { type Th } from '../../../../components/DataTable/THead';
import TBody from '../../../../components/DataTable/TBody';
import DataTable from '../../../../components/DataTable';
import useModal from '../../../../hooks/useModal';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import UpsertCompanyModal from './UpsertCompanyModal';
import CompaniesFilterTRow from './CompaniesFilterTRow';
import CompanyTRow from './CompanyTRow';
import Company from '../../../../types/Company';
import { thColumns as inheritedThColumns } from '../../../../pages/OwnersManagement/CompaniesManagement';
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
    selectedCompany: Company | null
    onSelect: (company: Company | null) => void
}

export default function CompaniesSelectionManagement({onSelect, selectedCompany}: Props) {
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: c.label ? tGlossary(`company.${c.label}`) : c.label }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchCompanies,
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
        onCreateEntity: onCreateCompany,
        onUpdateEntity: onUpdateCompany,
        onDeleteEntity: onDeleteCompany

    } = useFetchWithPaginationUsingState<Company>(companiesService.getAllCompaniesByCriteria);

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertCompanyModal
                            title={t("components.upsertCompanyModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateCompany}
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
                                <CompaniesFilterTRow
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    withSelectionColumn
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((company) => (
                                    <CompanyTRow
                                        key={company.id}
                                        company={company}
                                        onSelect={onSelect}
                                        isSelected={selectedCompany?.id === company.id}
                                        hideDeleteBtn
                                        hideUpdateBtn
                                        onUpdateCompany={onUpdateCompany}
                                        onDeleteCompany={onDeleteCompany}
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