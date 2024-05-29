import { PRIVATE_API } from "../../../../lib/axios/api";
import Owner from "../../../../types/Owner";

class OwnersService {
    getOwnerById(id: string | number) {
        
        return PRIVATE_API.get<Owner>("/owners/" + id)
    }
}

export default new OwnersService()