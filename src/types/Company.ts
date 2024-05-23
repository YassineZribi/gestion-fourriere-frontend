import Owner from "./Owner";

export default interface Company extends Owner {
    name: string
    taxId: string
}