import { ToCamelCase } from "../utils/utility-types";

export const FULLY_OUT = "FULLY_OUT"
export const PARTIALLY_OUT = "PARTIALLY_OUT"
export const FULLY_IN = "FULLY_IN"


export const processingStatuses = [FULLY_OUT, PARTIALLY_OUT, FULLY_IN] as const;


export type ProcessingStatus = (typeof processingStatuses)[number];
export type ProcessingStatusCamelCase = ToCamelCase<ProcessingStatus>;

const statusMapping: Record<ProcessingStatus, ProcessingStatusCamelCase> = {
    FULLY_OUT: "fullyOut",
    PARTIALLY_OUT: "partiallyOut",
    FULLY_IN: "fullyIn"
};

export function toCamelCaseStatus(status: ProcessingStatus): ProcessingStatusCamelCase {
    return statusMapping[status];
}