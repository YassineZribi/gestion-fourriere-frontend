import OperationLine from "./OperationLine"

export default interface Operation {
    id: number
    number: number
    year: number
    dateTime: string
    operationLines: OperationLine[]
}