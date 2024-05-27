import Company from "../../../../types/Company";
import Individual from "../../../../types/Individual";
import Owner from "../../../../types/Owner";

export function isCompany(owner: Owner): owner is Company {
    return (owner as Company).taxId !== undefined;
}

export function isIndividual(owner: Owner): owner is Individual {
    return (owner as Individual).nationalId !== undefined;
}