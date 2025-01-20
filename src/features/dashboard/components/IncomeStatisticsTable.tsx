import { Table } from "@mantine/core";
import { MONTHS } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import IncomeStatisticsDto from "../../../types/dtos/IncomeStatisticsDto";
import { IncomeStatisticsRequestDto } from "./IncomeStatisticsForm";
import Sup from "../../../components/Sup";

interface Props {
    data: IncomeStatisticsDto[]
    selectedData: IncomeStatisticsRequestDto
}

export default function IncomeStatisticsTable({data, selectedData}: Props) {
    const {t} = useTranslation()
    const {t: tGlossary} = useTranslation("glossary")
    const rows = data.map((element) => (
        <Table.Tr key={element.date}>
            {/* <Table.Td>{getDayOrMonth(selectedData.month, element.date)}</Table.Td> */}
            <Table.Td>{selectedData.month != null ? new Date(element.date).getDate() : t(`months.${MONTHS[new Date(element.date).getMonth()]}`)}</Table.Td>
            <Table.Td>{element.incomes} <Sup>{tGlossary(`currency.tn`)}</Sup></Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={"100%"}>
            <Table verticalSpacing="sm" styles={{ table: { tableLayout: 'fixed' } }} striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>{t(`components.incomeStatisticsTable.${selectedData.month != null ? "days": "months"}`)}</Table.Th>
                        <Table.Th>{t("components.incomeStatisticsTable.income")}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}