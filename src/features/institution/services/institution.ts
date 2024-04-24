import { PRIVATE_API, baseURL } from "../../../lib/axios/api";
import Institution from "../../../types/Institution";
import { APPLICATION_JSON, MULTIPART_FORM_DATA } from "../../../utils/constants";
import { SaveInstitutionDto } from "../components/SaveInstitutionForm";

class InstitutionService {
    getInstitution() {
        return PRIVATE_API.get<Institution>("/institution")
    }

    saveInstitution(saveInstitutionDto: SaveInstitutionDto, photoFile: File | null) {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(saveInstitutionDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.post<Institution>("/institution", formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    getFullLogoPath(logoPath: string) {
        return baseURL + logoPath;
    }
}

export default new InstitutionService()