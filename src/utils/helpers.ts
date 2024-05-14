import { upperFirst } from "@mantine/hooks";

export async function wait(duration: number = 2000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("success")
        }, duration);
    })
}

// function getAsyncData() {
//     return new Promise<Employee[]>((resolve) => {
//         setTimeout(() => resolve(employees), 2000);
//     });
// }

export function capitalize(str: string) {
    return upperFirst(str.toLowerCase())
}

export function isNumeric(str: string) {
    return !isNaN(Number(str)) && !isNaN(parseFloat(str))
  }

