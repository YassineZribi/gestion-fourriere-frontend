import { PRIVATE_API } from "../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import SubRegister from "../../../types/SubRegister";
import { UpsertSubRegisterDto } from "../components/UpsertSubRegisterModal";

class SubRegistersService {
    getAllSubRegistersByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<SubRegister>>("/sub-registers?" + criteria)
    }

    getAllSubRegistersByName(search: string) {
        
        return PRIVATE_API.get<SubRegister[]>("/sub-registers/search?name=" + search)
    }

    getSubRegisterById(id: string | number) {
        
        return PRIVATE_API.get<SubRegister>("/sub-registers/" + id)
    }

    createSubRegister(data: UpsertSubRegisterDto) {
        return PRIVATE_API.post<SubRegister>("/sub-registers", data)
    }

    updateSubRegister(id: number, data: UpsertSubRegisterDto) {
        return PRIVATE_API.patch<SubRegister>("/sub-registers/" + id, data)
    }

    deleteSubRegister(id: number) {
        return PRIVATE_API.delete<SubRegister>("/sub-registers/" + id)
    }
}

export default new SubRegistersService()