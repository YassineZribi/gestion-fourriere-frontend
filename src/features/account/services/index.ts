import { PRIVATE_API, baseURL } from "../../../lib/axios/api";
import User from "../../../types/User";
import { APPLICATION_JSON, MULTIPART_FORM_DATA } from "../../../utils/constants";
import { UpdateProfileDto } from "../components/UpdateProfileForm";
import ChangePasswordDto from "../types/ChangePasswordDto";

class AccountService {
    getProfile() {
        return PRIVATE_API.get<User>("/account/profile")
    }

    updateProfile(updateProfileDto: UpdateProfileDto, photoFile: File | null) {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(updateProfileDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.patch<User>("/account/profile", formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    getFullPhotoPath(photoPath: string) {
        return baseURL + photoPath;
    }

    changePassword(data: ChangePasswordDto) {
        return PRIVATE_API.patch("/account/change-password", data)
    }
}

export default new AccountService()