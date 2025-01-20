import { Table } from "@mantine/core";
import OperationsQuantityStatisticsDto from "../../../types/dtos/OperationsQuantityStatisticsDto";
import { OperationsQuantityStatisticsRequestDto } from "./OperationsQuantityStatisticsForm";
import { MONTHS } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

interface Props {
    data: OperationsQuantityStatisticsDto[]
    selectedData: OperationsQuantityStatisticsRequestDto
}

export default function OperationsQuantityStatisticsTable({data, selectedData}: Props) {
    const {t} = useTranslation()
    const rows = data.map((element) => (
        <Table.Tr key={element.date}>
            {/* <Table.Td>{getDayOrMonth(selectedData.month, element.date)}</Table.Td> */}
            <Table.Td>{selectedData.month != null ? new Date(element.date).getDate() : t(`months.${MONTHS[new Date(element.date).getMonth()]}`)}</Table.Td>
            <Table.Td>{element.inputQuantity}</Table.Td>
            <Table.Td>{element.outputQuantity}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={"100%"}>
            <Table verticalSpacing="sm" styles={{ table: { tableLayout: 'fixed' } }} striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>{t(`components.operationsQuantityStatisticsTable.${selectedData.month != null ? "days" : "months"}`)}</Table.Th>
                        <Table.Th>{t("components.operationsQuantityStatisticsTable.inputQuantity")}</Table.Th>
                        <Table.Th>{t("components.operationsQuantityStatisticsTable.outputQuantity")}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}