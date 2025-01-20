import InputOperationLine from "./InputOperationLine";
import { ProcessingStatus } from "./ProcessingStatus";
import Operation from "./Operation";
import Output from "./Output";
import Owner from "./Owner";
import Register from "./Register";
import Source from "./Source";
import SubRegister from "./SubRegister";

export default interface Input extends Operation {
    status: ProcessingStatus
    address: string
    latitude: number
    longitude: number
    register: Register
    subRegister: SubRegister
    owner: Owner
    source: Source
    inputOperationLines: InputOperationLine[]
    outputs: Output[]
}