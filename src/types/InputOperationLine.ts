import OperationLine from "./OperationLine"
import { ProcessingStatus } from "./ProcessingStatus"

export default interface InputOperationLine extends OperationLine {
    nightlyAmount: number
    subTotalNightlyAmount: number
    transportFee: number
    remainingQuantity: number
    status: ProcessingStatus
    fullyOut: boolean
    description: string
    observation: string | null
    note: string | null
    photoPath: string | null
}