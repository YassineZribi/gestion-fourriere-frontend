import Input from "./Input";
import Operation from "./Operation";
import OutputOperationLine from "./OutputOperationLine";

export default interface Output extends Operation {
    nightCount: number
    totalTransportFee: number
    totalPaymentAmountWithoutDiscount: number
    discountAmount: number
    discountObservation: string | null
    discount: boolean
    totalPaymentAmount: number
    receiptNumber: number
    receiptDateTime: string
    input: Input
    outputOperationLines: OutputOperationLine[]
}