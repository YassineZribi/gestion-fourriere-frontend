
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import { UsersTable } from '../../features/users/components/UsersTable';
import usersService from '../../features/users/services/users'
import User from '../../types/User';
import TablePagination from '../../components/TablePagination';
import UsersControls from '../../features/users/components/UsersControls';
import useFetchRoles from '../../features/roles/hooks/useFetchRoles';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';

export default function UserAccountsManagement() {
    const { roles } = useFetchRoles()
    const {
        responseData, 
        isLoading, 
        error, 
        fetchData: fetchUsers, 
        handleSort, 
        handleFilter, 
        handleClearFilters, 
        filtersEmpty,
        setPageParam,
        getFilterParams,
        getSortList,
        onCreateEntity: onCreateUser,
        onUpdateEntity: onUpdateUser,
        onDeleteEntity: onDeleteUser

    } = useFetchWithPagination<User>(usersService.getAllUsersByCriteria);

    return (
        <div>
            <Title>User accounts management</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <UsersControls
                        roles={roles}
                        onCreateUser={onCreateUser}
                    />
                    <UsersTable
                        users={responseData.content}
                        roles={roles}
                        sortList={getSortList()}
                        filters={getFilterParams()}
                        filtersAreEmpty={filtersEmpty()}
                        onSort={handleSort}
                        onFilter={handleFilter}
                        onClearFilters={handleClearFilters}
                        onUpdateUser={onUpdateUser}
                        onDeleteUser={onDeleteUser}
                    />
                    <TablePagination
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