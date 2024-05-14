import Employee from "../../../types/Employee";

export default interface EmployeeWithSubrdinates extends Omit<Employee, 'manager'> {
    subordinates: EmployeeWithSubrdinates[]
}