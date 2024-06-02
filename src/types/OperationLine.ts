import Article from "./Article";

interface OperationLineKey {
    operationId: number
    articleId: number
}

export default interface OperationLine {
    id: OperationLineKey
    article: Article
    quantity: number
    nightlyAmount: number
    transportFee: number
    lineTotalAmount: number
}