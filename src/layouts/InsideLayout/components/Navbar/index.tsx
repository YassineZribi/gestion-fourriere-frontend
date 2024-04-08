import { AppShell } from '@mantine/core';
import { NavbarMain } from './components/NavbarMain';
import { NavbarFooter } from './components/NavbarFooter';
import { NavbarHeader } from './components/NavbarHeader';

export default function Navbar() {

  return (
    <AppShell.Navbar p="md">
      <NavbarHeader />
      <NavbarMain />
      <NavbarFooter />
    </AppShell.Navbar>
  );
}