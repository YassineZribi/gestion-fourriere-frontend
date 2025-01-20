import { AreaChart } from '@mantine/charts';
import { useMemo } from 'react';
import { Box, Text } from '@mantine/core';
import { getDayOrMonth } from '../shared/utils/date';
import IncomeStatisticsDto from '../../../types/dtos/IncomeStatisticsDto';
import { IncomeStatisticsRequestDto } from './IncomeStatisticsForm';
import { useTranslation } from 'react-i18next';

interface Props {
    data: IncomeStatisticsDto[]
    selectedData: IncomeStatisticsRequestDto
}

export default function IncomeStatisticsChart({ data, selectedData }: Props) {
    const {t} = useTranslation()
    const {t: tGlossary} = useTranslation("glossary")
    const barChartData = useMemo(() => data.map(element => ({ ...element, date: getDayOrMonth(selectedData.month, element.date) })), [data])
    return (
        <Box pos={'relative'}>
            <Text opacity={0.7} fz={"xs"} ta={'left'} mb={5} pos={'absolute'} top={12} left={10}>{t("components.IncomeStatisticsChart.income")} ({tGlossary(`currency.tn`)})</Text>
            <AreaChart
                h={300}
                data={barChartData}
                dataKey="date"
                // xAxisLabel={selectedData.month != null ? "Jours" : "Mois"}
                // unit=" TND"
                withLegend
                series={[
                    // { name: 'inputQuantity', color: 'violet.6', label: "Quantité entrée" },
                    { name: 'incomes', color: 'blue.6', label: t("components.IncomeStatisticsChart.income") },
                    // { name: 'outputQuantity', color: 'teal.6', label: "Quantité sortie" },
                ]}
                curveType="linear"
                tickLine="none"
            />
            <Text opacity={0.7} fz={"xs"} ta={'right'} mt={5} mr={5}>{selectedData.month != null ? "Jours" : "Mois"}</Text>
            <Text fs={"italic"} opacity={0.9} fz={"sm"} ta={'center'}>{t("components.IncomeStatisticsChart.title")} : {selectedData.month && `${selectedData.month.padStart(2, '0')} / `}{selectedData.year}</Text>
        </Box>
    )
}