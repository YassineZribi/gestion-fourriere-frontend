import { PRIVATE_API } from "../../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../../types/FetchWithPaginationResponse";
import Input from "../../../../types/Input";
import { MULTIPART_FORM_DATA } from "../../../../utils/constants";

class InputsService {
    getAllInputsByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Input>>("/operations/inputs?" + criteria)
    }

    getInputById(id: string | number) {
        
        return PRIVATE_API.get<Input>("/operations/inputs/" + id)
    }

    createInput(formData: FormData) {
        return PRIVATE_API.post<Input>("/operations/inputs", formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    updateInput(id: number, formData: FormData) {
        return PRIVATE_API.patch<Input>("/operations/inputs/" + id, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    updateInputOwner(id: number, data: { newOwnerId: number }) {
        return PRIVATE_API.patch<Input>(`/operations/inputs/${id}/owner`, data)
    }

    deleteInput(id: number) {
        return PRIVATE_API.delete<Input>("/operations/inputs/" + id)
    }
}

export default new InputsService()