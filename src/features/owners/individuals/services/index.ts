import { PRIVATE_API } from "../../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../../types/FetchWithPaginationResponse";
import Individual from "../../../../types/Individual";
import { UpsertIndividualDto } from "../components/UpsertIndividualModal";

class IndividualsService {
    getAllIndividualsByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Individual>>("/owners/individuals?" + criteria)
    }

    getIndividualById(id: string | number) {
        
        return PRIVATE_API.get<Individual>("/owners/individuals/" + id)
    }

    createIndividual(data: UpsertIndividualDto) {
        return PRIVATE_API.post<Individual>("/owners/individuals", data)
    }

    updateIndividual(id: number, data: UpsertIndividualDto) {
        return PRIVATE_API.patch<Individual>("/owners/individuals/" + id, data)
    }

    deleteIndividual(id: number) {
        return PRIVATE_API.delete<Individual>("/owners/individuals/" + id)
    }
}

export default new IndividualsService()