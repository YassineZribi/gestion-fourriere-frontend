import { ReactNode, useEffect, useState } from 'react';
import { CloseButton, Combobox, Input, InputBase, Loader, useCombobox } from '@mantine/core';
import { AxiosResponse } from '../../lib/axios/api';

interface Props<T> {
  children: (data: T) => ReactNode
  selectedEntity?: T | null
  placeholder?: string
  label?: string
  variant?: 'default' | 'filled' | 'unstyled'
  shouldClearOption?: boolean
  onFetch: (search: string) => Promise<AxiosResponse<T[], any>>
  onSelectOption: (entity: T | null) => void
  onClear: () => void
}

export default function SearchableCombobox<T extends { id: number }>({ children, selectedEntity, placeholder, label, variant = "default", shouldClearOption, onFetch, onSelectOption, onClear }: Props<T>) {
  const [search, setSearch] = useState('');

  const [value, setValue] = useState<string | null>(selectedEntity ? selectedEntity.id.toString() : null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);


  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch('');
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
      if (/*data.length === 0 &&*/ !loading) {
        setLoading(true);
        onFetch(search).then((response) => {
          setData(response.data);
          setLoading(false);
          combobox.resetSelectedOption();
        });
      }
    },
  });

  const selectedOption = value === null ? null : data.find((entity) => entity.id.toString() === value) ?? selectedEntity;
  const options = data.map((entity) => (
      <Combobox.Option value={entity.id.toString()} key={entity.id}>
        {children(entity)}
        {/* <SelectOption {...entity} /> */}
      </Combobox.Option>
    ));

    const handleClearOption = () => {
      setValue(null)
      onClear()
    }

    useEffect(() => {
      if (shouldClearOption) {
        handleClearOption()
      }
    }, [shouldClearOption])

  return (
    <Combobox
      store={combobox}
      withinPortal={true}
      onOptionSubmit={(val) => {
        setValue(val);
        onSelectOption(data.find((employee) => employee.id.toString() === val) ?? null)
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label={label}
          variant={variant}
          component="button"
          type="button"
          pointer
          rightSection={
            loading ? <Loader size={18} /> :
              value !== null ? (
                <CloseButton
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={handleClearOption}
                  aria-label="Clear value"
                />
              ) : (
                <Combobox.Chevron />
              )
          }
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents={(value === null || loading) ? 'none' : 'all'}
          // multiline
        >
          {selectedOption ? (
            children(selectedOption)
            // <SelectOption {...selectedOption} />
          ) : (
            <Input.Placeholder>{placeholder ?? "Pick value"}</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => {
            const value = event.currentTarget.value
            setSearch(value)

            setLoading(true);
            onFetch(value).then((response) => {
              setData(response.data);
              setLoading(false);
              combobox.resetSelectedOption();
            });
          }}
          placeholder="Search"
        />
        <Combobox.Options h={200} style={{ overflowY: 'auto' }}>
          {
            loading
              ? <Combobox.Empty>Loading....</Combobox.Empty>
              : options.length > 0
                ? options
                : <Combobox.Empty>Nothing found</Combobox.Empty>
          }
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}