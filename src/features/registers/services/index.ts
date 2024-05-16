import { PRIVATE_API } from "../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import Register from "../../../types/Register";
import { UpsertRegisterDto } from "../components/UpsertRegisterModal";

class RegistersService {
    getAllRegistersByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Register>>("/registers?" + criteria)
    }

    getAllRegistersByName(search: string) {
        
        return PRIVATE_API.get<Register[]>("/registers/search?name=" + search)
    }

    getRegisterById(id: string | number) {
        
        return PRIVATE_API.get<Register>("/registers/" + id)
    }

    createRegister(data: UpsertRegisterDto) {
        return PRIVATE_API.post<Register>("/registers", data)
    }

    updateRegister(id: number, data: UpsertRegisterDto) {
        return PRIVATE_API.patch<Register>("/registers/" + id, data)
    }

    deleteRegister(id: number) {
        return PRIVATE_API.delete<Register>("/registers/" + id)
    }
}

export default new RegistersService()