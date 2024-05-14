import Employee from "./Employee"

export default interface Warehouse {
    id: number
    name: string
    address: string
    latitude: number
    longitude: number
    manager: Employee | null
}