import Owner from "./Owner";

export default interface Individual extends Owner {
    firstName: string
    lastName: string
    nationalId: string
}