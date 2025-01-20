import { PRIVATE_API } from "../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import Source from "../../../types/Source";
import { UpsertSourceDto } from "../components/UpsertSourceModal";

class SourcesService {
    baseUrl = "/sources"

    getAllSourcesByCriteria = (criteria: string) => {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Source>>(this.baseUrl + "?" + criteria)
    }

    getAllSourcesByName = (search: string) => {
        
        return PRIVATE_API.get<Source[]>(this.baseUrl + "/search?name=" + search)
    }

    getSourceById = (id: string | number) => {
        
        return PRIVATE_API.get<Source>(this.baseUrl + "/" + id)
    }

    createSource = (data: UpsertSourceDto) => {
        return PRIVATE_API.post<Source>(this.baseUrl, data)
    }

    updateSource = (id: number, data: UpsertSourceDto) => {
        return PRIVATE_API.patch<Source>(this.baseUrl + "/" + id, data)
    }

    deleteSource = (id: number) => {
        return PRIVATE_API.delete<Source>(this.baseUrl + "/" + id)
    }
}

export default new SourcesService()