import { notifications } from '@mantine/notifications';
import {rem } from '@mantine/core';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const alertSuccess = (message = "Welcome Yassine") => {
    notifications.show({
        color: 'teal',
        // title,
        message: <b>{message}</b>,
        icon: <CheckIcon style={{ width: rem(18), height: rem(18) }} />,
        autoClose: 3000,
    })
}

export const alertError = (message = "Welcome Yassine") => {
    notifications.show({
        color: 'red',
        // title,
        message: <b>{message}</b>,
        icon: <XMarkIcon style={{ width: rem(18), height: rem(18) }} />,
        autoClose: 3000,
    })
}

export const alertInfo = (message = "Welcome Yassine") => {
    notifications.show({
        color: 'blue',
        // title,
        message: <b>{message}</b>,
        icon: <div style={{ transform: 'scale(1.2)', fontFamily: "serif" }}>i</div>,
        autoClose: 3000,
    })
}