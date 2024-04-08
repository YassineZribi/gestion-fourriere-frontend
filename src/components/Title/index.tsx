
import { Title as MantineTitle } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
}

export default function Title({children}: Props) {

    return (
        <MantineTitle
            order={2}
            size="h1"
            fw={900}
            ta="center"
        >
            {children}
        </MantineTitle>
    );
}