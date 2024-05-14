import { Table } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
    minWidth?: number
}

export default function DataTable({ children, minWidth = 1000 }: Props) {
    return (
        <Table.ScrollContainer minWidth={minWidth}>
            <Table verticalSpacing="sm" styles={{ table: { tableLayout: 'fixed' } }} striped withRowBorders={false}>
                {children}
            </Table>
        </Table.ScrollContainer>
    )
}