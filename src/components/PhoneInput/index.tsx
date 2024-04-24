
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
    input: { styles, ...rest },
    combobox: {style, dial_code, onChange}
}: Props) {
    const { dir } = useDirection();


    return (
        <div style={{ position: 'relative' }}>
            <TextInput
                type='text'
                styles={{ input: { paddingInlineStart: 100 }, ...styles }}
                name="nationalPhoneNumber"
                label="Phone Number"
                placeholder="enter your phone number"
                {...rest}
            />
            <div style={{ position: 'absolute', top: 24.8, transform: `scale(0.9) translateX(${dir === "ltr" ? "-" : ""}4px)` }}>
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