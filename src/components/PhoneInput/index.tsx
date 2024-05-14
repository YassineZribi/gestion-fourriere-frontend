
import { TextInput, useDirection, TextInputProps } from '@mantine/core';
import CountriesPhoneNumbersCombobox, { CountriesPhoneNumbersComboboxType } from '../CountriesPhoneNumbersCombobox';

// interface Props {
//     textInputProps: Pick<TextInputProps, "error" | "onBlur" | "onChange" | "onFocus" | "value">
//     countriesComboboxProps: {
//         onChange: (v: string) => void;
//         dial_code: string;
//     }
// }

// interface Props2 {
//     onComboboxChange: (v: string) => void;
//     dial_code: string;
// }

interface Props {
    input: Partial<TextInputProps>
    combobox: CountriesPhoneNumbersComboboxType
}

export default function PhoneInputWithCountryCombobox({
    input: { styles, name, label, placeholder, ...rest },
    combobox: {style, dial_code, onChange}
}: Props) {
    const { dir } = useDirection();

    return (
        <div style={{ position: 'relative', direction: "ltr" }}>
            <TextInput
                type='text'
                styles={{ input: { paddingInlineStart: 100 }, root: {textAlign: dir === 'ltr' ? 'left': 'right'}, ...styles }}
                name={name}
                label={label}
                placeholder={placeholder}
                {...rest}
            />
            <div style={{ position: 'absolute', top: 24.8, transform: `scale(0.9) translateX(-4px)` }}>
                <CountriesPhoneNumbersCombobox
                    style={{
                        width: 100,
                        ...style
                    }}
                    onChange={onChange}
                    dial_code={dial_code}
                />
            </div>
        </div>
    );
}