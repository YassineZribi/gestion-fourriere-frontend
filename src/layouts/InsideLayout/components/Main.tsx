import { AppShell} from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
}

export default function Main({children}: Props) {

  return (
    <AppShell.Main>{children}</AppShell.Main>
  );
}