export default interface Employee {
    id: number
    firstName: string
    lastName: string
    position: string
    manager: Employee | null
}