
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import inputsService from '../../features/operations/inputs/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Input from '../../types/Input';
import useFetchSource from '../../features/sources/hooks/useFetchSource';
import useFetchOwner from '../../features/owners/shared/hooks/useFetchOwner';
import { useNavigate } from 'react-router-dom';
import InputsFilterTRow from '../../features/operations/inputs/components/InputsFilterTRow';
import InputTRow from '../../features/operations/inputs/components/InputTRow';
import { columnsWidth } from '../../features/operations/shared/components/helpers';
import InputsAdvancedFilters from '../../features/operations/inputs/components/InputsAdvancedFilters';
import useFetchRegister from '../../features/registers/hooks/useFetchRegister';
import AdvancedFiltersCollapse from '../../features/operations/inputs/components/AdvancedFiltersCollapse';

export const advancedInputFilterProperties = ["startNumber", "endNumber", "startDate", "endDate", "description", "registerId", "sourceId"] as const;

const thColumns = [
    {
        style: { width: columnsWidth.number },
        name: "number",
        label: "number"
    },
    {
        style: { width: columnsWidth.year },
        name: "year",
        label: "year"
    },
    {
        name: "dateTime",
        label: "dateTime"
    },
    {
        label: "owner"
    },
    {
        label: "status"
    },
] as const

export default function InputsManagement() {
    const navigate = useNavigate()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: tGlossary(`input.${c.label}`) }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchInputs,
        handleSort,
        handleFilter,
        showFilters,
        showAdvancedFilters,
        toggleFilters,
        toggleAdvancedFilters,
        handleClearFilters,
        handleClearAdvancedFilters,
        hasFilters,
        hasAdvancedFilters,
        setPageParam,
        getSearchParam,
        getFilterParams,
        getAdvancedFilterParams,
        getSortList,
        onCreateEntity: onCreateInput,
        onUpdateEntity: onUpdateInput,
        onDeleteEntity: onDeleteInput

    } = useFetchWithPagination<Input>(inputsService.getAllInputsByCriteria, advancedInputFilterProperties);

    const { source: selectedSource } = useFetchSource(getSearchParam('sourceId'))
    const { owner: selectedOwner } = useFetchOwner(getSearchParam('ownerId'))
    const { register: selectedRegister } = useFetchRegister(getSearchParam('registerId'))


    return (
        <div>
            <Title>{tRoot("inputsManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <AdvancedFiltersCollapse
                        showFilters={showAdvancedFilters}
                        onToggleFilters={toggleAdvancedFilters}
                    >
                        <InputsAdvancedFilters
                            selectedRegister={selectedRegister}
                            selectedSource={selectedSource}
                            filters={getAdvancedFilterParams()}
                            hasFilters={hasAdvancedFilters()}
                            onFilter={handleFilter}
                            onClearFilters={handleClearAdvancedFilters}
                        />
                    </AdvancedFiltersCollapse>
                    <Space h="lg" />
                    <DataTableControlPanel
                        onAddBtnClick={() => navigate('/create-input')}
                    />
                    <DataTable>
                        <THead
                            columns={thColumnsWithTranslation}
                            sortList={getSortList()}
                            showFilters={showFilters}
                            actionsColumnWidth={columnsWidth.actions}
                            onSort={handleSort}
                            onToggleFilters={toggleFilters}
                        />
                        <TBody
                            showFilters={showFilters}
                            filterRow={
                                <InputsFilterTRow
                                    selectedOwner={selectedOwner}
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((input) => (
                                    <InputTRow
                                        key={input.id}
                                        input={input}
                                        onDeleteInput={onDeleteInput}
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