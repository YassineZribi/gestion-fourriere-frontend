import { Table } from '@mantine/core';
import User from '../../../types/User';
import { useState } from 'react';
import Role from '../../../types/Role';
import UsersTBody from './UsersTBody';
import UsersTHead from './UsersTHead';

interface Props {
    users: User[]
    roles: Role[]
    sortList: string[]
    filters: { [key: string]: string | undefined }
    filtersAreEmpty: boolean
    onSort: (name: string) => void
    onFilter: (property: string, value: string) => void
    onClearFilters: () => void
    onUpdateUser: () => void
    onDeleteUser: () => void
}

export function UsersTable({ users, roles, sortList, filters, filtersAreEmpty, onSort, onFilter, onClearFilters, onUpdateUser, onDeleteUser }: Props) {
    const [showFilters, setShowFilters] = useState(!filtersAreEmpty);

    const handleToggleFilters = () => {
        setShowFilters(prev => !prev);
        onClearFilters()
    };

    return (
        <Table.ScrollContainer minWidth={1000}>
            <Table verticalSpacing="sm" styles={{ table: { tableLayout: 'fixed' } }} striped withRowBorders={false}>
                <UsersTHead
                    sortList={sortList}
                    showFilters={showFilters}
                    onSort={onSort}
                    onToggleFilters={handleToggleFilters}
                />
                <UsersTBody
                    users={users}
                    filters={filters}
                    filtersAreEmpty={filtersAreEmpty}
                    showFilters={showFilters}
                    roles={roles}
                    onFilter={onFilter}
                    onClearFilters={onClearFilters}
                    onUpdateUser={onUpdateUser}
                    onDeleteUser={onDeleteUser}
                />
            </Table>
        </Table.ScrollContainer>
    );
}