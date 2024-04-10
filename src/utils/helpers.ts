import { upperFirst } from "@mantine/hooks";

export async function wait(duration: number = 2000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("success")
        }, duration);
    })
}

export function capitalize(str: string) {
    return upperFirst(str.toLowerCase())
}

