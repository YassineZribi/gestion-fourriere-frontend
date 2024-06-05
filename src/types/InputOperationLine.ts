import OperationLine from "./OperationLine"

export default interface InputOperationLine extends OperationLine {
    remainingQuantity: number
    nightlyAmount: number
    subTotalNightlyAmount: number
    transportFee: number
    photoPath: string | null
}