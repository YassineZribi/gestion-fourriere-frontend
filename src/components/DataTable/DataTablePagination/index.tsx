import { Group, Pagination, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface Props {
    currentPage: number;
    totalPages: number;
    totalEntities: number;
    numberOfEntitiesInCurrentPage: number;
    skippedEntities: number;
    isFetching: boolean;
    onChange: (newValue: number) => void;
}

export default function DataTablePagination({ currentPage, totalPages, totalEntities, numberOfEntitiesInCurrentPage, skippedEntities, isFetching, onChange }: Props) {
    const {t} = useTranslation()
    const start = totalEntities !== 0 ? skippedEntities + 1 : skippedEntities
    const end = skippedEntities + numberOfEntitiesInCurrentPage

    return (
        <Group justify="end" mt={"md"}>
            <Text>{t("components.dataTablePagination.summary", {start, end, total: totalEntities})}</Text>
            <Pagination
                // disabled={isFetching}
                onChange={onChange}
                boundaries={2}
                value={currentPage}
                total={totalPages}
            />
        </Group>
    );
}