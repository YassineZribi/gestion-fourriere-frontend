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

export function arrayToObject<T extends readonly string[]>(arr: T): { [K in T[number]]: K } {
    return arr.reduce((obj, key) => {
      // Assert the type of key to T[number] to satisfy TypeScript
      (obj as { [K in T[number]]: K })[key as T[number]] = key as T[number];
      return obj;
    }, {} as { [K in T[number]]: K });
  }