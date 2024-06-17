import User from "./User"

export default interface Employee extends User {
    position: string | null
    manager: Employee | null
}