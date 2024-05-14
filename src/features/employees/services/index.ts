import { PRIVATE_API } from "../../../lib/axios/api";
import Employee from "../../../types/Employee";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import { APPLICATION_JSON, MULTIPART_FORM_DATA } from "../../../utils/constants";
import { UpsertEmployeeDto } from "../components/UpsertEmployeeModal";
import EmployeeWithSubrdinates from "../types/EmployeeWithSubordinates";

class EmployeesService {
    getAllEmployeessByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Employee>>("/employees?" + criteria)
    }

    getChiefExecutiveWithRecursiveSubordinates() {
        return PRIVATE_API.get<EmployeeWithSubrdinates>("/employees/chief-executive")
    }

    getAllEmployeesByFullName(search: string) {
        
        return PRIVATE_API.get<Employee[]>("/employees/search?fullName=" + search)
    }

    getEmployeeById(id: string | number) {
        
        return PRIVATE_API.get<Employee>("/employees/" + id)
    }



    createEmployee(upsertEmployeeDto: UpsertEmployeeDto, photoFile: File | null) {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(upsertEmployeeDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.post<Employee>("/employees", formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    updateEmployee(id: number, upsertEmployeeDto: UpsertEmployeeDto, photoFile: File | null) {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(upsertEmployeeDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.patch<Employee>("/employees/" + id, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    deleteEmployee(id: number) {
        return PRIVATE_API.delete<Employee>("/employees/" + id)
    }
}

export default new EmployeesService()