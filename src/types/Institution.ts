import Employee from "./Employee"

export default interface Institution {
    id: number
    name: string
    logoPath: string | null
    address: string
    email: string
    phoneNumber: string
    chiefExecutive: Employee | null
    employees: Employee[]
}