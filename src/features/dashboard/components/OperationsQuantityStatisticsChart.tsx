import { BarChart } from '@mantine/charts';
import OperationsQuantityStatisticsDto from "../../../types/dtos/OperationsQuantityStatisticsDto"
import { useMemo } from 'react';
import { OperationsQuantityStatisticsRequestDto } from './OperationsQuantityStatisticsForm';
import { Box, Text } from '@mantine/core';
import { getDayOrMonth } from '../shared/utils/date';
import { useTranslation } from 'react-i18next';

interface Props {
    data: OperationsQuantityStatisticsDto[]
    selectedData: OperationsQuantityStatisticsRequestDto
}

export default function OperationsQuantityStatisticsChart({ data, selectedData }: Props) {
    const {t} = useTranslation()
    const barChartData = useMemo(() => data.map(element => ({ ...element, date: getDayOrMonth(selectedData.month, element.date) })), [data])
    return (
        <Box pos={'relative'}>
            <Text opacity={0.7} fz={"xs"} ta={'center'} mb={5} pos={'absolute'} top={12} left={10}>{t("components.operationsQuantityStatisticsChart.quantities")}</Text>
            <BarChart
                h={300}
                data={barChartData}
                dataKey="date"
                // xAxisLabel={selectedData.month != null ? "Jours" : "Mois"}
                // unit=" TND"
                withLegend
                series={[
                    { name: 'inputQuantity', color: 'violet.6', label: t("components.operationsQuantityStatisticsChart.inputQuantity") },
                    // { name: 'Laptops', color: 'blue.6' },
                    { name: 'outputQuantity', color: 'teal.6', label: t("components.operationsQuantityStatisticsChart.outputQuantity") },
                ]}
                tickLine="none"
            />
            <Text opacity={0.7} fz={"xs"} ta={'right'} mt={5} mr={5}>{selectedData.month != null ? "Jours" : "Mois"}</Text>
            <Text fs={"italic"} opacity={0.9} fz={"sm"} ta={'center'}>{t("components.operationsQuantityStatisticsChart.title")} : {selectedData.month && `${selectedData.month.padStart(2, '0')} / `}{selectedData.year}</Text>
        </Box>
    )
}