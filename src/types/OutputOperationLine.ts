import InputOperationLine from "./InputOperationLine"
import OperationLine from "./OperationLine"

export default interface OutputOperationLine extends OperationLine {
    subTotalPaymentAmount: number
    inputOperationLine: InputOperationLine
}