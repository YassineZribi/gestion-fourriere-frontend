import { useEffect, useState } from 'react';
import { CloseButton } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { DatePickerInput, DateValue } from '@mantine/dates';

interface Props {
  defaultValue: Date | undefined
  onChange: (newValue: Date | null) => void;
}

export default function ClearableDatePickerInput({ defaultValue, onChange }: Props) {
  const [value, setValue] = useState<Date | null>(defaultValue ? defaultValue : null);

  const { t } = useTranslation()

  const handleChange2 = (newValue: DateValue) => {
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
        placeholder={t("labels.noFilter")}
        variant='filled'
        value={value}
        onChange={handleChange2}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => handleChange2(null)}
            style={{ display: value ? undefined : 'none' }}
          />
        }
        valueFormat="DD/MM/YYYY"
      />
    </>
  );
}