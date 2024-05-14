export default interface Employee {
    id: number
    firstName: string
    lastName: string
    position: string
    photoPath: string | null
    manager: Employee | null
}