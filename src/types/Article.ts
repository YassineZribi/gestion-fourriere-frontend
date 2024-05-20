import ArticleFamily from "./ArticleFamily"

export default interface Article {
    id: number
    name: string
    transportFee: number
    photoPath: string | null
    articleFamily: ArticleFamily | null
}