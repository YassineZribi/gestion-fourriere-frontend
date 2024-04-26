import { Table as MantineTable } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
    minWidth?: number
}

export default function Table({ children, minWidth = 1000 }: Props) {
    return (
        <MantineTable.ScrollContainer minWidth={minWidth}>
            <MantineTable verticalSpacing="sm" styles={{ table: { tableLayout: 'fixed' } }} striped withRowBorders={false}>
                {children}
            </MantineTable>
        </MantineTable.ScrollContainer>
    )
}