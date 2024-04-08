
import { Space } from '@mantine/core';
import Title from '../../components/Title';
import { UsersTable } from '../../features/users/components/UsersTable';
import usersService from '../../features/users/services/users'
import { useEffect, useState } from 'react';
import FetchWithPaginationResponse from '../../types/FetchWithPaginationResponse';
import User from '../../types/User';
import UsersPagination from '../../features/users/components/UsersPagination';
import { useSearchParams } from 'react-router-dom';
import UsersControls from '../../features/users/components/UsersControls';
import useFetchRoles from '../../features/roles/hooks/useFetchRoles';

export default function UserAccountsManagement() {
    const { roles } = useFetchRoles()
    const [responseData, setResponseData] = useState<FetchWithPaginationResponse<User> | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const res = await usersService.getAllUsersByCriteria(searchParams.toString())
            setResponseData(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [searchParams])

    const handleSort = (name: string) => {
        const sortList = searchParams.getAll("sort")
        const itemAlreadyExists = !!sortList.find(item => item.split("-")[0] === name)
        if (!itemAlreadyExists) {
            searchParams.append("sort", `${name}-asc`)
        }
        else {
            const newSortList = sortList
                .filter(item => {
                    const [key, value] = item.split("-")
                    if (key === name && value === "desc") {
                        return false
                    }
                    return true
                })
                .map(item => {
                    const [key, value] = item.split("-")
                    if (key === name) { // && if (value === "asc")
                        return `${name}-desc`;
                    }
                    else
                        return item
                })
            searchParams.delete("sort")
            for (const x of newSortList) {
                searchParams.append("sort", x)
            }
        }
        const page = searchParams.get("page")
        if (page && page !== "1") searchParams.set("page", "1")

        setSearchParams(searchParams)
    }

    const handleFilter = (property: string, value: string) => {
        if (value) {
            searchParams.set(property, value)
        } else {
            searchParams.delete(property)
        }
        const page = searchParams.get("page")
        if (page && page !== "1") searchParams.set("page", "1")

        setSearchParams(searchParams)
    }

    const handleClearFilters = () => {
        const newSearchParams: { [key: string]: any } = {
            sort: searchParams.getAll("sort")
        }
        const page = searchParams.get("page")
        if (page && page !== "1") newSearchParams["page"] = "1"

        setSearchParams(newSearchParams)
    }

    const getFilterParams = () => {
        const allFilterParams: { [key: string]: any } = {};

        for (const [key, value] of searchParams.entries()) {
            if (key !== "page" && key !== "sort") allFilterParams[key] = value
        }

        return allFilterParams
    }

    const filtersEmpty = () => {
        const filters = getFilterParams()
        for (const property in filters) {
            // console.log(`${property}: ${filters[property]}`);
            if (filters[property]?.trim())
                return false
        }
        return true
    }

    // all queryParams (including : filterParams + sort + page)
    // const queryParams = Object.fromEntries(searchParams.entries())

    const onCreateUser = () => { // manage -> upsert + delete
        handleClearFilters()
        const page = searchParams.get("page")
        if (page === null || page === "1") fetchUsers()
    }

    const onDeleteUser = () => { // manage -> upsert + delete
        fetchUsers()
    }

    const onUpdateUser = onDeleteUser

    return (
        <div>
            <Title>User accounts management</Title>
            <Space my={'xl'} />
            {/* {isLoading && <h3>Loading...</h3>} */}
            {responseData && (
                <>
                    <UsersControls
                        roles={roles}
                        onCreateUser={onCreateUser}
                    />
                    <UsersTable
                        users={responseData.content}
                        roles={roles}
                        sortList={searchParams.getAll("sort")}
                        filters={getFilterParams()}
                        filtersAreEmpty={filtersEmpty()}
                        onSort={handleSort}
                        onFilter={handleFilter}
                        onClearFilters={handleClearFilters}
                        onUpdateUser={onUpdateUser}
                        onDeleteUser={onDeleteUser}
                    />
                    <UsersPagination
                        onChange={newValue => {
                            searchParams.set("page", String(newValue))
                            setSearchParams(searchParams)
                        }}
                        currentPage={responseData.pageable.pageNumber + 1}
                        totalPages={responseData.totalPages}
                        totalUsers={responseData.totalElements}
                        numberOfUsersInCurrentPage={responseData.numberOfElements}
                        skippedUsers={responseData.pageable.offset}
                    />
                </>
            )}
        </div>
    );
}