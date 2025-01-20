import { PRIVATE_API } from "../../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../../types/FetchWithPaginationResponse";
import Output from "../../../../types/Output";
import { InsertOutputDto } from "../components/InsertOutputForm";
// /output-operations

class OutputsService {
    baseUrl = "/operations/outputs"

    getAllOutputsByCriteria = (criteria: string) => {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Output>>(this.baseUrl + "?" + criteria)
    }

    getOutputById = (id: string | number) => {
        
        return PRIVATE_API.get<Output>(this.baseUrl + "/" + id)
    }

    createOutput = (data: InsertOutputDto) => {
        return PRIVATE_API.post<Output>(this.baseUrl, data)
    }

    deleteOutput = (id: number) => {
        return PRIVATE_API.delete<Output>(this.baseUrl + "/" + id)
    }

    generateOutputsReport = (criteria: string) => {
        return PRIVATE_API.get<Blob>(this.baseUrl + "/report?" + criteria, { responseType: "blob" })
    }
}

export default new OutputsService()