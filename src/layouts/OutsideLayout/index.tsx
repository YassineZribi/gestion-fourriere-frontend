import { AppShell } from '@mantine/core';
import Header from './components/Header';
import Main from './components/Main';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
  }

export function OutsideLayout({children}: Props) {

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <Header />
      <Main>{children}</Main>
    </AppShell>
  );
}