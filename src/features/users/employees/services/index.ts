import { PRIVATE_API } from "../../../../lib/axios/api";
import Employee from "../../../../types/Employee";
import FetchWithPaginationResponse from "../../../../types/FetchWithPaginationResponse";
import { UpsertEmployeeDto } from "../components/UpsertEmployeeModal";
import EmployeeWithSubrdinates from "../../../../types/EmployeeWithSubordinates";

class EmployeesService {
    baseUrl = "/users/employees"

    getAllEmployeessByCriteria = (criteria: string) => {
        return PRIVATE_API.get<FetchWithPaginationResponse<Employee>>(this.baseUrl + "?" + criteria)
    }

    getChiefExecutiveWithRecursiveSubordinates = () => {
        return PRIVATE_API.get<EmployeeWithSubrdinates>(this.baseUrl + "/chief-executive")
    }

    getAllEmployeesByFullName = (search: string) => {

        return PRIVATE_API.get<Employee[]>(this.baseUrl + "/search?fullName=" + search)
    }

    getEmployeeById = (id: string | number) => {

        return PRIVATE_API.get<Employee>(this.baseUrl + "/" + id)
    }



    createEmployee = (data: UpsertEmployeeDto) => {
        return PRIVATE_API.post<Employee>(this.baseUrl, data)
    }

    updateEmployee = (id: number, data: UpsertEmployeeDto) => {
        return PRIVATE_API.patch<Employee>(this.baseUrl + "/" + id, data)
    }

    deleteEmployee = (id: number) => {
        return PRIVATE_API.delete<Employee>(this.baseUrl + "/" + id)
    }
}

export default new EmployeesService()