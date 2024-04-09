import { PRIVATE_API } from "../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import User from "../../../types/User";
import { UpsertUserDto } from "../components/UpsertUserModal";

class UsersService {
    getAllUsersByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<User>>("/users?" + criteria)
    }

    createUser(data: UpsertUserDto) {
        return PRIVATE_API.post<User>("/users", data)
    }

    updateUser(id: number, data: UpsertUserDto) {
        return PRIVATE_API.patch<User>("/users/" + id, data)
    }

    deleteUser(id: number) {
        return PRIVATE_API.delete<User>("/users/" + id)
    }
}

export default new UsersService()