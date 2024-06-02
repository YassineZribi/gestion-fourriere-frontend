export type ToCamelCase<S extends string> =
    S extends `${infer T}_${infer U}` ?
    `${Lowercase<T>}${Capitalize<ToCamelCase<U>>}` :
    Lowercase<S>;