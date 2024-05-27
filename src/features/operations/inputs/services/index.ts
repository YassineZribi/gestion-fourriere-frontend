import { PRIVATE_API } from "../../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../../types/FetchWithPaginationResponse";
import Input from "../../../../types/Input";
import { UpsertInputDto } from "../components/UpsertInputForm";

class InputsService {
    getAllInputsByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Input>>("/operations/inputs?" + criteria)
    }

    getInputById(id: string | number) {
        
        return PRIVATE_API.get<Input>("/operations/inputs/" + id)
    }

    createInput(data: UpsertInputDto) {
        return PRIVATE_API.post<Input>("/operations/inputs", data)
    }

    updateInput(id: number, data: UpsertInputDto) {
        return PRIVATE_API.patch<Input>("/operations/inputs/" + id, data)
    }

    deleteInput(id: number) {
        return PRIVATE_API.delete<Input>("/operations/inputs/" + id)
    }
}

export default new InputsService()