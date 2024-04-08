import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode
}

export default function InsideLayout({children}: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <Header opened={opened} toggle={toggle} />
      <Navbar />
      <Main>{children}</Main>
    </AppShell>
  );
}