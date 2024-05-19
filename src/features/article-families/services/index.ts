import { PRIVATE_API } from "../../../lib/axios/api";
import ArticleFamily from "../../../types/ArticleFamily";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import { APPLICATION_JSON, MULTIPART_FORM_DATA } from "../../../utils/constants";
import { UpsertArticleFamilyDto } from "../components/UpsertArticleFamilyModal";

class ArticleFamiliesService {
    getAllArticleFamiliesByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<ArticleFamily>>("/article-families?" + criteria)
    }

    getAllArticleFamiliesByName(search: string) {
        
        return PRIVATE_API.get<ArticleFamily[]>("/article-families/search?name=" + search)
    }

    getArticleFamilyById(id: string | number) {
        
        return PRIVATE_API.get<ArticleFamily>("/article-families/" + id)
    }

    createArticleFamily(upsertArticleFamilyDto: UpsertArticleFamilyDto, photoFile: File | null) {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(upsertArticleFamilyDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.post<ArticleFamily>("/article-families", formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    updateArticleFamily(id: number, upsertArticleFamilyDto: UpsertArticleFamilyDto, photoFile: File | null) {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(upsertArticleFamilyDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.patch<ArticleFamily>("/article-families/" + id, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    deleteArticleFamily(id: number) {
        return PRIVATE_API.delete<ArticleFamily>("/article-families/" + id)
    }
}

export default new ArticleFamiliesService()