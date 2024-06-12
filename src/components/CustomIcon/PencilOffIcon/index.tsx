import { rem } from '@mantine/core';

interface AddressBookIconProps extends React.ComponentPropsWithoutRef<'svg'> {
    size?: number | string;
}

// Source: https://mantine.dev/guides/icons/#custom-icons
export function PencilOffIcon({ size, style, ...rest }: AddressBookIconProps) {
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
            <path d="M10 10l-6 6v4h4l6 -6m1.99 -1.99l2.504 -2.504a2.828 2.828 0 1 0 -4 -4l-2.5 2.5"></path>
            <path d="M13.5 6.5l4 4"></path>
            <path d="M3 3l18 18"></path>
        </svg>
    );
}