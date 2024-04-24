import { Group, Pagination, Text } from "@mantine/core";

interface Props {
    currentPage: number;
    totalPages: number;
    totalEntities: number;
    numberOfEntitiesInCurrentPage: number;
    skippedEntities: number;
    isFetching: boolean;
    onChange: (newValue: number) => void;
}

export default function TablePagination({ currentPage, totalPages, totalEntities, numberOfEntitiesInCurrentPage, skippedEntities, isFetching, onChange }: Props) {

    return (
        <Group justify="end" mt={"md"}>
            <Text>{totalEntities !== 0 ? skippedEntities + 1 : skippedEntities} - {skippedEntities + numberOfEntitiesInCurrentPage} of {totalEntities}</Text>
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