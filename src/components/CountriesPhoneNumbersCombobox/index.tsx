import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';

const countries = [
    {
        name: "Tunisia",
        dial_code: "+216",
        code: "TN"
    },
    {
        name: "France",
        dial_code: "+33",
        code: "FR"
    },
] as const;

type Country = {
    name: string,
    dial_code: string,
    code: string
};

function OptionContent({ country }: { country: Country }) {
    return (
        <>
            <img src={`https://raw.githubusercontent.com/stefangabos/world_countries/master/data/flags/24x24/${country.code.toLocaleLowerCase()}.png`} />
            {country.dial_code}
        </>
    )
}

interface Props {
    style?: React.CSSProperties
    onChange: (v: string) => void;
    dial_code: string;
}

export type CountriesPhoneNumbersComboboxType = Props

export default function CountriesPhoneNumbersCombobox({style, onChange, dial_code}: Props) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState<Country>(() => {
        return countries.find(c => c.dial_code === dial_code) || countries[0]
    });

    const options = countries.map((country) => (
        <Combobox.Option style={{display: 'flex', alignItems: 'center'}} value={country.dial_code} key={country.code}>
            <OptionContent country={country} />
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
                setValue(countries.find(c => c.dial_code === val) || countries[0]);
                onChange(val)
                combobox.closeDropdown();
            }}
            size='xs'
            
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    tabIndex={-1}
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    style={style}
                    styles={{input: {display: 'flex', alignItems: 'center'}}}
                >
                    {<OptionContent country={value} /> || <Input.Placeholder>Pick Country</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}