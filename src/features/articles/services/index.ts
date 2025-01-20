import { PRIVATE_API } from "../../../lib/axios/api";
import Article from "../../../types/Article";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import { MULTIPART_FORM_DATA } from "../../../utils/constants";

class ArticlesService {
    baseUrl = "/articles"

    getAllArticlesByCriteria = (criteria: string) => {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Article>>(this.baseUrl + "?" + criteria)
    }

    getAllArticlesByName = (search: string) => {
        
        return PRIVATE_API.get<Article[]>(this.baseUrl + "/search?name=" + search)
    }

    getArticleById = (id: string | number) => {
        
        return PRIVATE_API.get<Article>(this.baseUrl + "/" + id)
    }

    createArticle = (formData: FormData) => {
        return PRIVATE_API.post<Article>(this.baseUrl, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    updateArticle = (id: number, formData: FormData) => {
        return PRIVATE_API.patch<Article>(this.baseUrl + "/" + id, formData, { headers: { "Content-Type": MULTIPART_FORM_DATA } })
    }

    deleteArticle = (id: number) => {
        return PRIVATE_API.delete<Article>(this.baseUrl + "/" + id)
    }
}

export default new ArticlesService()