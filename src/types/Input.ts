import Operation from "./Operation";
import Output from "./Output";
import Owner from "./Owner";
import Register from "./Register";
import Source from "./Source";
import SubRegister from "./SubRegister";

export default interface Input extends Operation {
    status: "FULLY_OUT" | "PARTIALLY_OUT" | "FULLY_IN"
    register: Register
    subRegister: SubRegister
    owner: Owner
    source: Source
    outputs: Output[]
}