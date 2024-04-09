import { Group, Pagination, Text } from "@mantine/core";

interface Props {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    numberOfUsersInCurrentPage: number;
    skippedUsers: number;
    isFetching: boolean;
    onChange: (newValue: number) => void;
}

export default function UsersPagination({ currentPage, totalPages, totalUsers, numberOfUsersInCurrentPage, skippedUsers, isFetching, onChange }: Props) {

    return (
        <Group justify="space-between" mt={"md"}>
            <Text>Showing {skippedUsers + 1} to {skippedUsers + numberOfUsersInCurrentPage} of {totalUsers} users</Text>
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