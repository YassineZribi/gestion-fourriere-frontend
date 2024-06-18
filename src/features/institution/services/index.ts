import { PRIVATE_API } from "../../../lib/axios/api";
import EmployeeWithSubrdinates from "../../../types/EmployeeWithSubordinates";
import Institution from "../../../types/Institution";
import { APPLICATION_JSON, MULTIPART_FORM_DATA } from "../../../utils/constants";
import { SaveInstitutionDto } from "../components/SaveInstitutionForm";

class InstitutionService {
    baseUrl = "/institution"

    getInstitution = () => {
        return PRIVATE_API.get<Institution>(this.baseUrl)
    }

    saveInstitution = (saveInstitutionDto: SaveInstitutionDto, photoFile: File | null) => {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(saveInstitutionDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.post<Institution>(this.baseUrl, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    // get chief executive with recursive subordinates
    getOrganizationalChart = () => {
        return PRIVATE_API.get<EmployeeWithSubrdinates>(this.baseUrl + "/organizational-chart")
    }
}

export default new InstitutionService()