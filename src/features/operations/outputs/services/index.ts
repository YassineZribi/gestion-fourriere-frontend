import { PRIVATE_API } from "../../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../../types/FetchWithPaginationResponse";
import Output from "../../../../types/Output";
import { InsertOutputDto } from "../components/InsertOutputForm";

class OutputsService {
    getAllOutputsByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Output>>("/operations/outputs?" + criteria)
    }

    getOutputById(id: string | number) {
        
        return PRIVATE_API.get<Output>("/operations/outputs/" + id)
    }

    createOutput(data: InsertOutputDto) {
        return PRIVATE_API.post<Output>("/operations/outputs", data)
    }

    deleteOutput(id: number) {
        return PRIVATE_API.delete<Output>("/operations/outputs/" + id)
    }
}

export default new OutputsService()