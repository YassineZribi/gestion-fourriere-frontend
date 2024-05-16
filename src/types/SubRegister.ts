import Register from "./Register"

export default interface SubRegister {
    id: number
    name: string
    description: string
    register: Register
}