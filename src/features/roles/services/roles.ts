import { PRIVATE_API } from "../../../lib/axios/api";
import Role from "../../../types/Role";

class RolesService {
    getNonAdminRoles() {
        return PRIVATE_API.get<Role[]>("/roles/non-admin")
    }
}

export default new RolesService()