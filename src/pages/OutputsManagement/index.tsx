
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import outputsService from '../../features/operations/outputs/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvancedFiltersCollapse from '../../components/AdvancedFiltersCollapse';
import Output from '../../types/Output';
import OutputsAdvancedFilters from '../../features/operations/outputs/components/OutputsAdvancedFilters';
import { columnsWidth } from '../../features/operations/outputs/components/helpers';
import OutputsFilterTRow from '../../features/operations/outputs/components/OutputsFilterTRow';
import OutputTRow from '../../features/operations/outputs/components/OutputTRow';
import { EXPANDING_ROW_COLUMN_WIDTH } from '../../utils/constants';

export const advancedOutputFilterProperties = ["startNumber", "endNumber", "startDate", "endDate"] as const;

const thColumns = [
    {
        style: { width: EXPANDING_ROW_COLUMN_WIDTH },
        label: ""
    },
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
        name: "totalPaymentAmount",
        label: "totalPaymentAmount"
    },
    {
        name: "receiptNumber",
        label: "receiptNumber"
    },
] as const

export default function OutputsManagement() {
    const navigate = useNavigate()
    const [isGeneratingPdf, setGeneratingPdf] = useState(false);
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")

    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: c.label ? tGlossary(`output.${c.label}`) : c.label }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchOutputs,
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
        getSearchParams,
        getFilterParams,
        getAdvancedFilterParams,
        getSortList,
        onCreateEntity: onCreateOutput,
        onUpdateEntity: onUpdateOutput,
        onDeleteEntity: onDeleteOutput

    } = useFetchWithPagination<Output>(outputsService.getAllOutputsByCriteria, advancedOutputFilterProperties);

    const handleGeneratePdf = () => {
        setGeneratingPdf(true)
        outputsService.generateOutputsReport(getSearchParams().toString())
        .then(res => {
            // Create a blob URL for the PDF
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Open the blob URL in a new tab
            window.open(pdfUrl, '_blank');
        })
        .catch(err => console.log(err))
        .finally(() => setGeneratingPdf(false))
    }

    return (
        <div>
            <Title>{tRoot("outputsManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <AdvancedFiltersCollapse
                        showFilters={showAdvancedFilters}
                        onToggleFilters={toggleAdvancedFilters}
                    >
                        <OutputsAdvancedFilters
                            filters={getAdvancedFilterParams()}
                            hasFilters={hasAdvancedFilters()}
                            onFilter={handleFilter}
                            onClearFilters={handleClearAdvancedFilters}
                        />
                    </AdvancedFiltersCollapse>
                    <Space h="lg" />
                    <DataTableControlPanel
                        onGeneratePdfBtnClick={handleGeneratePdf}
                        isGeneratingPdf={isGeneratingPdf}
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
                                <OutputsFilterTRow
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((output) => (
                                    <OutputTRow
                                        key={output.id}
                                        output={output}
                                        onDeleteOutput={onDeleteOutput}
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