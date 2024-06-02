import { ToCamelCase } from "../utils/utility-types";


export const inputStatuses = ["FULLY_OUT", "PARTIALLY_OUT", "FULLY_IN"] as const;


export type InputStatus = (typeof inputStatuses)[number];
export type InputStatusCamelCase = ToCamelCase<InputStatus>;

const statusMapping: Record<InputStatus, InputStatusCamelCase> = {
    FULLY_OUT: "fullyOut",
    PARTIALLY_OUT: "partiallyOut",
    FULLY_IN: "fullyIn"
};

export function toCamelCaseStatus(status: InputStatus): InputStatusCamelCase {
    return statusMapping[status];
}