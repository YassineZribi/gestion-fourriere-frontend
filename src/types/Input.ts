import InputOperationLine from "./InputOperationLine";
import { InputStatus } from "./InputStatus";
import Operation from "./Operation";
import Output from "./Output";
import Owner from "./Owner";
import Register from "./Register";
import Source from "./Source";
import SubRegister from "./SubRegister";

export default interface Input extends Operation {
    status: InputStatus
    register: Register
    subRegister: SubRegister
    owner: Owner
    source: Source
    inputOperationLines: InputOperationLine[]
    outputs: Output[]
}