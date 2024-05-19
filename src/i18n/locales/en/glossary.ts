import Glossary from "../types/Glossary";

const glossary: Glossary = {
    user: {
        email: "Email",
        password: "Password",
        firstName: "First Name",
        lastName: "Last Name",
        phoneNumber: "Phone Number",
        role: "Role"
    },
    institution: {
        name: "Name",
        address: "Address",
        email: "Email",
        phoneNumber: "Phone Number",
        manager: "Manager"
    },
    employee: {
        firstName: "First Name",
        lastName: "Last Name",
        position: "Position",
        manager: "Manager"
    },
    warehouse: {
        name: "Name",
        address: "Address",
        latitude: "Latitude",
        longitude: "Longitude",
        manager: "Manager"
    },
    register: {
        name: "Name",
        observation: "Observation"
    },
    subRegister: {
        name: "Name",
        description: "Description",
        register: "Register"
    },
    measurementUnit: {
        name: "Name",
        symbol: "Symbol"
    },
    articleFamily: {
        name: "Name",
        description: "Description",
        nightlyAmount: "Amount / night (TND)",
        calculationMethod: "Calculation method",
        photo: "Photo",
        register: "Register",
        measurementUnit: "Measurement unit"
    },
    roles: {
        admin: "Admin",
        manager: "Manager",
        operator: "Operator"
    },
    calculationMethods: {
        perUnit: "Per unit",
        perBatch: "Per batch"
    }
} as const;

export default glossary