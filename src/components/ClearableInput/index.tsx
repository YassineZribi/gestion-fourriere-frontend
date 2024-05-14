import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import { Input, CloseButton } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface Props {
    type?: HTMLInputTypeAttribute
    defaultValue: string | undefined
    onChange: (newValue: string) => void;
}

export default function ClearableInput({ type = 'text', defaultValue, onChange }: Props) {
  const [value, setValue] = useState<string>(defaultValue || '');
  const { t } = useTranslation()

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
        placeholder={t("labels.noFilter")}
        type={type}
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