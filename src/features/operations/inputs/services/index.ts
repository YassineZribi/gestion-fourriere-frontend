import { PRIVATE_API } from "../../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../../types/FetchWithPaginationResponse";
import Input from "../../../../types/Input";
import { MULTIPART_FORM_DATA } from "../../../../utils/constants";
// /input-operations

class InputsService {
    baseUrl = "/operations/inputs"

    getAllInputsByCriteria = (criteria: string) => {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Input>>(this.baseUrl + "?" + criteria)
    }

    getInputById = (id: string | number) => {
        
        return PRIVATE_API.get<Input>(this.baseUrl + "/" + id)
    }

    createInput = (formData: FormData) => {
        return PRIVATE_API.post<Input>(this.baseUrl, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    updateInput = (id: number, formData: FormData) => {
        return PRIVATE_API.patch<Input>(this.baseUrl + "/" + id, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    updateInputOwner = (id: number, data: { newOwnerId: number }) => {
        return PRIVATE_API.patch<Input>(this.baseUrl + `/${id}/owner`, data)
    }

    deleteInput = (id: number) => {
        return PRIVATE_API.delete<Input>(this.baseUrl + "/" + id)
    }

    generateInputsReport = (criteria: string) => {
        return PRIVATE_API.get<Blob>(this.baseUrl + "/report?" + criteria, { responseType: "blob" })
    }
}

export default new InputsService()