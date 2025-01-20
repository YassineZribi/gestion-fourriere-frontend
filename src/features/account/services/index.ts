import { PRIVATE_API } from "../../../lib/axios/api";
import User from "../../../types/User";
import { MULTIPART_FORM_DATA } from "../../../utils/constants";
import ChangePasswordDto from "../types/ChangePasswordDto";

class AccountService {
    baseUrl = "/account"

    getProfile = () => {
        return PRIVATE_API.get<User>(this.baseUrl + "/profile")
    }

    updateProfile = (formData: FormData) => {
        return PRIVATE_API.patch<User>(this.baseUrl + "/profile", formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    changePassword = (data: ChangePasswordDto) => {
        return PRIVATE_API.patch(this.baseUrl + "/change-password", data)
    }
}

export default new AccountService()