import { PRIVATE_API } from "../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import User from "../../../types/User";
import { CreateUserDto } from "../components/CreateUserModal";

class UsersService {
    getAllUsersByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<User>>("/users?" + criteria)
    }

    createUser(data: CreateUserDto) {
        return PRIVATE_API.post<User>("/users", data)
    }

    deleteUser(id: number) {
        return PRIVATE_API.delete<User>("/users/" + id)
    }
}

export default new UsersService()