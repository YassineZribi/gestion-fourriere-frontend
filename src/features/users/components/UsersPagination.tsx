import { Group, Pagination, Text } from "@mantine/core";

interface Props {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    numberOfUsersInCurrentPage: number;
    skippedUsers: number;
    onChange: (newValue: number) => void;
}

export default function UsersPagination({ currentPage, totalPages, totalUsers, numberOfUsersInCurrentPage, skippedUsers, onChange }: Props) {

    return (
        <Group justify="space-between" mt={"md"}>
            <Text>Showing {skippedUsers + 1} to {skippedUsers + numberOfUsersInCurrentPage} of {totalUsers} users</Text>
            <Pagination
                onChange={onChange}
                boundaries={2}
                value={currentPage}
                total={totalPages}
                // styles={{ root: { display: "flex", justifyContent: "end" } }}
            />
        </Group>
    );
}