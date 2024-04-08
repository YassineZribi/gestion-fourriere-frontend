import { PUBLIC_API } from "../../../lib/axios/api";
import { LoginDto } from "../components/LoginForm";
import LoginResponse from "../types/LoginResponse";

class AuthService {
    login(loginData: LoginDto) {
        return PUBLIC_API.post<LoginResponse>("/auth/login", loginData)
    }
}

export default new AuthService()