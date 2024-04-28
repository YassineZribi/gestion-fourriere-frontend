
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import usersService from '../../features/users/services'
import User from '../../types/User';
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchRoles from '../../features/roles/hooks/useFetchRoles';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import { columnsWidth } from '../../features/users/components/helpers';
import UsersFilterTRow from '../../features/users/components/UsersFilterTRow';
import UpsertUserModal from '../../features/users/components/UpsertUserModal';
import UserTRow from '../../features/users/components/UserTRow';
import useModal from '../../hooks/useModal';

const tableHeaderColumns: Th[] = [
    {
        style: { width: columnsWidth.avatar },
        label: ""
    },
    {
        name: "firstName",
        label: "First Name"
    },
    {
        name: "lastName",
        label: "Last Name"
    },
    {
        label: "Roles"
    },
    {
        name: "email",
        label: "Email"
    },
    {
        label: "Phone"
    }
]

export default function UserAccountsManagement() {
    useFetchRoles()
    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchUsers,
        handleSort,
        handleFilter,
        showFilters,
        toggleFilters,
        handleClearFilters,
        hasFilters,
        setPageParam,
        getFilterParams,
        getSortList,
        onCreateEntity: onCreateUser,
        onUpdateEntity: onUpdateUser,
        onDeleteEntity: onDeleteUser

    } = useFetchWithPagination<User>(usersService.getAllUsersByCriteria);

    const [isOpen, {open, close}] = useModal()

    return (
        <div>
            <Title>User accounts management</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertUserModal
                            title="Create user account"
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateUser}
                        />
                    </DataTableControlPanel>
                    <DataTable>
                        <THead
                            columns={tableHeaderColumns}
                            sortList={getSortList()}
                            showFilters={showFilters}
                            onSort={handleSort}
                            onToggleFilters={toggleFilters}
                        />
                        <TBody
                            showFilters={showFilters}
                            filterRow={
                                <UsersFilterTRow
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((user) => (
                                    <UserTRow
                                        key={user.id}
                                        user={user}
                                        onUpdateUser={onUpdateUser}
                                        onDeleteUser={onDeleteUser}
                                    />
                                ))
                            }
                        </TBody>
                    </DataTable>
                    <DataTablePagination
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