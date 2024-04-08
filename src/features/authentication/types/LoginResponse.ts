import User from "../../../types/User";

export default interface LoginResponse {
    user: User,
    accessToken: string
}