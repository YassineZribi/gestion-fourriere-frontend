
import { Center, Loader } from '@mantine/core';
import individualsService from '../../features/owners/individuals/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import useModal from '../../hooks/useModal';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import UpsertIndividualModal from '../../features/owners/individuals/components/UpsertIndividualModal';
import IndividualsFilterTRow from '../../features/owners/individuals/components/IndividualsFilterTRow';
import IndividualTRow from '../../features/owners/individuals/components/IndividualTRow';
import Individual from '../../types/Individual';

const thColumns = [
    {
        name: "firstName",
        label: "firstName"
    },
    {
        name: "lastName",
        label: "lastName"
    },
    {
        name: "nationalId",
        label: "nationalId"
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

export default function IndividualsManagement() {
    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`individual.${c.label}`) }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchIndividuals,
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
        onCreateEntity: onCreateIndividual,
        onUpdateEntity: onUpdateIndividual,
        onDeleteEntity: onDeleteIndividual

    } = useFetchWithPagination<Individual>(individualsService.getAllIndividualsByCriteria);

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
                        <UpsertIndividualModal
                            title={t("components.upsertIndividualModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateIndividual}
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
                                <IndividualsFilterTRow
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((individual) => (
                                    <IndividualTRow
                                        key={individual.id}
                                        individual={individual}
                                        onUpdateIndividual={onUpdateIndividual}
                                        onDeleteIndividual={onDeleteIndividual}
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