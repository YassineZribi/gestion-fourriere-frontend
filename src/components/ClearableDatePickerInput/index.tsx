import { useEffect, useState } from 'react';
import { CloseButton } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { DatePickerInput, DateValue } from '@mantine/dates';

interface Props {
  defaultValue: Date | undefined
  placeholder?: string
  label?: string
  variant?: 'default' | 'filled' | 'unstyled'
  onChange: (newValue: Date | null) => void;
}

export default function ClearableDatePickerInput({ label, placeholder, defaultValue, variant ="filled", onChange }: Props) {
  const [value, setValue] = useState<Date | null>(defaultValue ? defaultValue : null);

  const { t } = useTranslation()

  const handleChange = (newValue: DateValue) => {
      setValue(newValue)
      onChange(newValue)
    
  }

  useEffect(() => {
    console.log(defaultValue);
    if (defaultValue === undefined && value !== null) setValue(null)

  }, [defaultValue])

  return (
    <>
      <DatePickerInput
        placeholder={placeholder ?? t("labels.noFilter")}
        label={label}
        variant={variant}
        value={value}
        onChange={handleChange}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => handleChange(null)}
            style={{ display: value ? undefined : 'none' }}
          />
        }
        valueFormat="DD/MM/YYYY"
      />
    </>
  );
}