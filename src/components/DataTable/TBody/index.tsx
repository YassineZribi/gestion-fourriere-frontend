import { Table } from "@mantine/core"
import { ReactNode } from "react";

interface Props {
    children: ReactNode // rows
    showFilters: boolean
    filterRow: ReactNode
}

export default function TBody({ children, showFilters, filterRow }: Props) {

    return (
        <Table.Tbody>
            {
                showFilters && (filterRow)
            }
            {children}
        </Table.Tbody>
    )
}