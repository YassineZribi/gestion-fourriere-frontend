import { ComboboxData, ComboboxItem, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    data: ComboboxData
    defaultValue: ComboboxItem | undefined
    onChange: (newValue: string) => void;
}

export default function ClearableSelect({ data, defaultValue, onChange }: Props) {
    const [value, setValue] = useState<ComboboxItem | null>(defaultValue || null);
    const { t } = useTranslation()

    const handleChange = (newOption: ComboboxItem | null) => {
        setValue(newOption)
        onChange(newOption ? newOption.value : '')
    }

    useEffect(() => {
        console.log(defaultValue);
        if (defaultValue === undefined && value !== null) setValue(null)

    }, [defaultValue])

    useEffect(() => {
        if (data.length && defaultValue && value === null) setValue(defaultValue) 
    }, [data])

    return (
        <Select
            //   label="Your favorite library"
            variant='filled'
            placeholder={t("labels.noFilter")}
            data={data}
            value={value ? value.value : null}
            onChange={(_value, option) => handleChange(option)}
            clearable
        />
    );
}