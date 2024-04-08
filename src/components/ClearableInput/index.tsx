import { useEffect, useState } from 'react';
import { Input, CloseButton } from '@mantine/core';

interface Props {
    defaultValue: string | undefined
    onChange: (newValue: string) => void;
}

export default function ClearableInput({ defaultValue, onChange }: Props) {
  const [value, setValue] = useState<string>(defaultValue || '');

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange(newValue)
  }

  useEffect(() => {
    console.log(defaultValue);
    if (defaultValue === undefined && value !== '') setValue('') 
    
  }, [defaultValue])

  return (
    <>
      <Input
        placeholder="No filter"
        variant='filled'
        value={value}
        onChange={(event) => handleChange(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => handleChange('')}
            style={{ display: value ? undefined : 'none' }}
          />
        }
      />
    </>
  );
}