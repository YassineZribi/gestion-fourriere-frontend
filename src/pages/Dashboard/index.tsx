import { useState } from "react";
import { usePDF } from 'react-to-pdf';
import exportFromJSON from 'export-from-json'
import OperationsQuantityStatisticsForm, { OperationsQuantityStatisticsRequestDto } from "../../features/dashboard/components/OperationsQuantityStatisticsForm";
import { isAxiosError } from "../../lib/axios/api";
import dashboardService from "../../features/dashboard/services"
import useEffectOnce from "../../hooks/useEffectOnce";

import OperationsQuantityStatisticsDto from "../../types/dtos/OperationsQuantityStatisticsDto";
import IncomeStatisticsDto from "../../types/dtos/IncomeStatisticsDto";
import OperationsQuantityStatisticsChart from "../../features/dashboard/components/OperationsQuantityStatisticsChart";
import { Center, Combobox, Loader, SimpleGrid, Space, Stack } from "@mantine/core";
import OperationsQuantityStatisticsTable from "../../features/dashboard/components/OperationsQuantityStatisticsTable";
import { DropdownExport } from "../../features/dashboard/shared/components/DropdownExport";
import IncomeStatisticsForm, { IncomeStatisticsRequestDto } from "../../features/dashboard/components/IncomeStatisticsForm";
import IncomeStatisticsChart from "../../features/dashboard/components/IncomeStatisticsChart";
import IncomeStatisticsTable from "../../features/dashboard/components/IncomeStatisticsTable";
export default function Dashboard() {
    const [operationsQuantityStatisticsRequestDto, setOperationsQuantityStatisticsRequestDto] = useState<OperationsQuantityStatisticsRequestDto>({
        articleFamilyId: null,
        registerId: null,
        sourceId: null,
        month: null,
        year: new Date().getFullYear()
    });
    const [incomeStatisticsRequestDto, setIncomeStatisticsRequestDto] = useState<IncomeStatisticsRequestDto>({
        articleFamilyId: null,
        registerId: null,
        sourceId: null,
        month: null,
        year: new Date().getFullYear()
    });

    const [operationsQuantityStatisticsDtos, setOperationsQuantityStatisticsDtos] = useState<OperationsQuantityStatisticsDto[]>([]);
    const [incomeStatisticsDtos, setIncomeStatisticsDtos] = useState<IncomeStatisticsDto[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { toPDF: toOperationsQuantityPDF, targetRef: operationsQuantityTargetRef } = usePDF({ filename: 'operation-quantities.pdf', page: { margin: { left: 25, top: 10, right: 25, bottom: 10 } }, method: "open" });
    const { toPDF: toIncomePDF, targetRef: incomeTargetRef } = usePDF({ filename: 'income.pdf', page: { margin: { left: 25, top: 10, right: 25, bottom: 10 } }, method: "open" });

    useEffectOnce(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [response1, response2] = await Promise.all([
                    dashboardService.getOperationsQuantityStatistics(operationsQuantityStatisticsRequestDto),
                    dashboardService.getIncomeStatistics(incomeStatisticsRequestDto)
                ]);

                setOperationsQuantityStatisticsDtos(response1.data);
                setIncomeStatisticsDtos(response2.data);
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    setError(`Error: ${error.response.status} - ${error.response.statusText}`);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    });

    if (loading) {
        return <><Space my={'xl'} /><Center><Loader size={50} /></Center></>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const operationsQuantityExportFormats = [
        { format: 'PDF', onClick: () => toOperationsQuantityPDF() },
        { format: 'CSV', onClick: () => exportFromJSON({ data: operationsQuantityStatisticsDtos, fileName: "quantity-statistics", exportType: "csv" }) },
        { format: 'XLS', onClick: () => exportFromJSON({ data: operationsQuantityStatisticsDtos, fileName: "quantity-statistics", exportType: "xls" }) } // Excel
    ];

    const operationsQuantityOptions = operationsQuantityExportFormats.map(({ format, onClick }) => (
        <Combobox.Option value={format} key={format} onClick={onClick}>
            {format}
        </Combobox.Option>
    ));

    const incomeExportFormats = [
        { format: 'PDF', onClick: () => toIncomePDF() },
        { format: 'CSV', onClick: () => exportFromJSON({ data: incomeStatisticsDtos, fileName: "quantity-statistics", exportType: "csv" }) },
        { format: 'XLS', onClick: () => exportFromJSON({ data: incomeStatisticsDtos, fileName: "quantity-statistics", exportType: "xls" }) } // Excel
    ];

    const incomeOptions = incomeExportFormats.map(({ format, onClick }) => (
        <Combobox.Option value={format} key={format} onClick={onClick}>
            {format}
        </Combobox.Option>
    ));

    return (
        <>
            {/* <h1>Dashboard</h1> */}
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={"xl"}>
                <Stack>
                    <OperationsQuantityStatisticsForm
                        initialValues={operationsQuantityStatisticsRequestDto}
                        dropdownExportFormats={<DropdownExport>{operationsQuantityOptions}</DropdownExport>}
                        onSubmit={(selectedData, retrievedData) => {
                            setOperationsQuantityStatisticsRequestDto(selectedData)
                            setOperationsQuantityStatisticsDtos(retrievedData)
                        }}
                    />
                    <div ref={operationsQuantityTargetRef}>
                        <OperationsQuantityStatisticsChart
                            data={operationsQuantityStatisticsDtos}
                            selectedData={operationsQuantityStatisticsRequestDto}
                        />
                        <Space my={"md"} />
                        <OperationsQuantityStatisticsTable
                            data={operationsQuantityStatisticsDtos}
                            selectedData={operationsQuantityStatisticsRequestDto}
                        />
                    </div>
                </Stack>
                <Stack>
                    <IncomeStatisticsForm
                        initialValues={incomeStatisticsRequestDto}
                        dropdownExportFormats={<DropdownExport>{incomeOptions}</DropdownExport>}
                        onSubmit={(selectedData, retrievedData) => {
                            setIncomeStatisticsRequestDto(selectedData)
                            setIncomeStatisticsDtos(retrievedData)
                        }}
                    />
                    <div ref={incomeTargetRef}>
                        <IncomeStatisticsChart
                            data={incomeStatisticsDtos}
                            selectedData={incomeStatisticsRequestDto}
                        />
                        <Space my={"md"} />
                        <IncomeStatisticsTable
                            data={incomeStatisticsDtos}
                            selectedData={incomeStatisticsRequestDto}
                        />
                    </div>
                </Stack>
            </SimpleGrid>
        </>
    )
}