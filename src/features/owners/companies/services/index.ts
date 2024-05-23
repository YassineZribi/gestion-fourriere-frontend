import { PRIVATE_API } from "../../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../../types/FetchWithPaginationResponse";
import Company from "../../../../types/Company";
import { UpsertCompanyDto } from "../components/UpsertCompanyModal";

class CompaniesService {
    getAllCompaniesByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Company>>("/owners/companies?" + criteria)
    }

    getCompanyById(id: string | number) {
        
        return PRIVATE_API.get<Company>("/owners/companies/" + id)
    }

    createCompany(data: UpsertCompanyDto) {
        return PRIVATE_API.post<Company>("/owners/companies", data)
    }

    updateCompany(id: number, data: UpsertCompanyDto) {
        return PRIVATE_API.patch<Company>("/owners/companies/" + id, data)
    }

    deleteCompany(id: number) {
        return PRIVATE_API.delete<Company>("/owners/companies/" + id)
    }
}

export default new CompaniesService()