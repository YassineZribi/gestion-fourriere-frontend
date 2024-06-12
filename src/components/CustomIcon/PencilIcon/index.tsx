import { rem } from '@mantine/core';

interface AddressBookIconProps extends React.ComponentPropsWithoutRef<'svg'> {
    size?: number | string;
}

// Source: https://mantine.dev/guides/icons/#custom-icons
export function PencilIcon({ size, style, ...rest }: AddressBookIconProps) {
    return (
        <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: rem(size), height: rem(size), ...style }}
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
            <path d="M13.5 6.5l4 4"></path>
        </svg>
    );
}