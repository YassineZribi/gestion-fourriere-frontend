
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import employeesService from '../../features/users/employees/services'
import DataTablePagination from '../../components/DataTable/DataTablePagination';
import DataTableControlPanel from '../../components/DataTable/DataTableControlPanel';
import useFetchWithPagination from '../../hooks/useFetchWithPagination';
import THead, { type Th } from '../../components/DataTable/THead';
import TBody from '../../components/DataTable/TBody';
import DataTable from '../../components/DataTable';
import EmployeesFilterTRow from '../../features/users/employees/components/EmployeesFilterTRow';
import UpsertEmployeeModal from '../../features/users/employees/components/UpsertEmployeeModal';
import EmployeeTRow from '../../features/users/employees/components/EmployeeTRow';
import useModal from '../../hooks/useModal';
import { AVATAR_COLUMN_WIDTH } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Employee from '../../types/Employee';
import useFetchEmployee from '../../features/users/employees/hooks/useFetchEmployee';

const thColumns = [
    {
        style: { width: AVATAR_COLUMN_WIDTH },
        label: ""
    },
    {
        name: "firstName",
        label: "firstName"
    },
    {
        name: "lastName",
        label: "lastName"
    },
    {
        label: "role"
    },
    {
        name: "email",
        label: "email"
    },
    {
        label: "manager"
    }
] as const

export default function UserAccountsManagement() {
    const { t } = useTranslation()
    const { t: tRoot } = useTranslation("root")
    const { t: tGlossary } = useTranslation("glossary")
    
    const thColumnsWithTranslation: Th[] = useMemo(() => thColumns.map(c => (
        { ...c, label: c.label ? tGlossary(`employee.${c.label}`) : c.label }
    )), [tGlossary])

    const {
        responseData,
        isLoading,
        error,
        fetchData: fetchEmployees,
        handleSort,
        handleFilter,
        showFilters,
        toggleFilters,
        handleClearFilters,
        hasFilters,
        setPageParam,
        getSearchParam,
        getFilterParams,
        getSortList,
        onCreateEntity: onCreateEmployee,
        onUpdateEntity: onUpdateEmployee,
        onDeleteEntity: onDeleteEmployee

    } = useFetchWithPagination<Employee>(employeesService.getAllEmployeessByCriteria);

    const { employee: selectedManager } = useFetchEmployee(getSearchParam('managerId'))

    const [isOpen, { open, close }] = useModal()

    return (
        <div>
            <Title>{tRoot("userAccountsManagement.title")}</Title>
            <Space my={'xl'} />
            {error && <p>{error}</p>}
            {!responseData && isLoading && <Center><Loader size={50} /></Center>}
            {responseData && (
                <>
                    <DataTableControlPanel
                        onAddBtnClick={open}
                    >
                        <UpsertEmployeeModal
                            title={t("components.upsertEmployeeModal.title.onInsert")}
                            isOpened={isOpen}
                            onClose={close}
                            onSubmit={onCreateEmployee}
                        />
                    </DataTableControlPanel>
                    <DataTable>
                        <THead
                            columns={thColumnsWithTranslation}
                            sortList={getSortList()}
                            showFilters={showFilters}
                            onSort={handleSort}
                            onToggleFilters={toggleFilters}
                        />
                        <TBody
                            showFilters={showFilters}
                            filterRow={
                                <EmployeesFilterTRow
                                    selectedManager={selectedManager}
                                    filters={getFilterParams()}
                                    hasFilters={hasFilters()}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters}
                                />
                            }
                        >
                            {
                                responseData.content.map((employee) => (
                                    <EmployeeTRow
                                        key={employee.id}
                                        employee={employee}
                                        onUpdateEmployee={onUpdateEmployee}
                                        onDeleteEmployee={onDeleteEmployee}
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