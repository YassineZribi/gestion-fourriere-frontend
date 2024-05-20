import { PRIVATE_API } from "../../../lib/axios/api";
import Article from "../../../types/Article";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import { APPLICATION_JSON, MULTIPART_FORM_DATA } from "../../../utils/constants";
import { UpsertArticleDto } from "../components/UpsertArticleModal";

class ArticlesService {
    getAllArticlesByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Article>>("/articles?" + criteria)
    }

    getAllArticlesByName(search: string) {
        
        return PRIVATE_API.get<Article[]>("/articles/search?name=" + search)
    }

    getArticleById(id: string | number) {
        
        return PRIVATE_API.get<Article>("/articles/" + id)
    }

    createArticle(upsertArticleDto: UpsertArticleDto, photoFile: File | null) {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(upsertArticleDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.post<Article>("/articles", formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    updateArticle(id: number, upsertArticleDto: UpsertArticleDto, photoFile: File | null) {
        const formData = new FormData()
        
        // Convert the JSON object to a Blob with 'application/json' content type
        var data = new Blob([JSON.stringify(upsertArticleDto)], { type: APPLICATION_JSON });
        
        formData.append("data", data)
        
        if (photoFile) {
            formData.append("media", photoFile)
        }

        return PRIVATE_API.patch<Article>("/articles/" + id, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    deleteArticle(id: number) {
        return PRIVATE_API.delete<Article>("/articles/" + id)
    }
}

export default new ArticlesService()