import { PRIVATE_API } from "../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import Source from "../../../types/Source";
import { UpsertSourceDto } from "../components/UpsertSourceModal";

class SourcesService {
    getAllSourcesByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Source>>("/sources?" + criteria)
    }

    getAllSourcesByName(search: string) {
        
        return PRIVATE_API.get<Source[]>("/sources/search?name=" + search)
    }

    getSourceById(id: string | number) {
        
        return PRIVATE_API.get<Source>("/sources/" + id)
    }

    createSource(data: UpsertSourceDto) {
        return PRIVATE_API.post<Source>("/sources", data)
    }

    updateSource(id: number, data: UpsertSourceDto) {
        return PRIVATE_API.patch<Source>("/sources/" + id, data)
    }

    deleteSource(id: number) {
        return PRIVATE_API.delete<Source>("/sources/" + id)
    }
}

export default new SourcesService()