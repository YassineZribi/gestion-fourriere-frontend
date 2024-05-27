import { ReactNode, useEffect, useState } from 'react';
import { CloseButton, Combobox, Input, InputBase, rem, useCombobox } from '@mantine/core';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Props<T> {
  children: (data: T) => ReactNode
  selectedEntity?: T | null
  placeholder?: ReactNode
  label?: string
  error?: string
  disabled?: boolean
  withAsterisk?: boolean
  variant?: 'default' | 'filled' | 'unstyled'
  shouldClearOption?: boolean
  onClear: () => void
  onClick?: () => void
}

export default function ReadOnlyCombobox<T extends { id: number }>({ children, selectedEntity, placeholder, label, error, disabled = false, withAsterisk = false, variant = "default", shouldClearOption, onClear, onClick }: Props<T>) {
  const [value, setValue] = useState<string | null>(selectedEntity ? selectedEntity.id.toString() : null);

  useEffect(() => {
    if (selectedEntity)
      setValue(selectedEntity.id.toString())
    // else
    //   setValue(null)
  }, [selectedEntity])


  const combobox = useCombobox({

  });

  const selectedOption = value === null ? null : selectedEntity;

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
    >
      <Combobox.Target>
        <InputBase
          label={label}
          error={error}
          withAsterisk={withAsterisk}
          variant={variant}
          disabled={disabled}
          component="button"
          type="button"
          pointer
          rightSection={
              value !== null ? (
                <CloseButton
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={handleClearOption}
                  aria-label="Clear value"
                />
              ) : (
                <MagnifyingGlassIcon style={{ width: rem(22), height: rem(22) }} /> 
                // <Combobox.Chevron />
              )
          }
          onClick={() => onClick?.()}
          rightSectionPointerEvents={(value === null) ? 'none' : 'all'}
          multiline
        >
          {selectedOption ? (
            children(selectedOption)
          ) : (
            <Input.Placeholder>{placeholder ?? "Pick value"}</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>
    </Combobox>
  );
}