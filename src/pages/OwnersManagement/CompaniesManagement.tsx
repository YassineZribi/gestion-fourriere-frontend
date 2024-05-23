
import { Center, Loader } from '@mantine/core';
import companiesService from '../../features/owners/companies/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import useModal from '../../hooks/useModal';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import UpsertCompanyModal from '../../features/owners/companies/components/UpsertCompanyModal';
import CompaniesFilterTRow from '../../features/owners/companies/components/CompaniesFilterTRow';
import CompanyTRow from '../../features/owners/companies/components/CompanyTRow';
import Company from '../../types/Company';

const thColumns = [
    {
        name: "name",
        label: "name"
    },
    {
        name: "taxId",
        label: "taxId"
    },
    {
        name: "email",
        label: "email"
    },
    {
        name: "phoneNumber",
        label: "phoneNumber"
    },
    // {
    //     label: "address"
    // }
] as const

export default function CompaniesManagement() {
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`company.${c.label}`) }
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

    } = useFetchWithPagination<Company>(companiesService.getAllCompaniesByCriteria);

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