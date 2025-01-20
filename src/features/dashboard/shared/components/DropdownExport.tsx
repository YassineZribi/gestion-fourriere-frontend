import { Button, Combobox, rem, useCombobox } from '@mantine/core';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode
}

export function DropdownExport({ children }: Props) {
  const {t} = useTranslation()
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <>
      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        withinPortal={false}
        onOptionSubmit={(val) => {
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Button 
            onClick={() => combobox.toggleDropdown()} 
            variant="outline"
            rightSection={<ChevronDownIcon style={{ width: rem(16), height: rem(16) }} />}
            >
              {t("buttons.export")}
            </Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{children}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}