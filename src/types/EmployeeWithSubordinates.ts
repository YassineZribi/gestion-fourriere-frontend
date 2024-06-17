import Employee from "./Employee";

export default interface EmployeeWithSubrdinates extends Omit<Employee, 'manager'> {
    subordinates: EmployeeWithSubrdinates[]
}