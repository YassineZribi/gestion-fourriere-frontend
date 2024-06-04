import Article from "./Article";

export default interface OperationLine {
    id: number
    article: Article
    quantity: number
    nightlyAmount: number
    subTotalNightlyAmount: number
    transportFee: number
}