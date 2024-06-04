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
        nightlyAmount: "Amount / night",
        calculationMethod: "Calculation method",
        photo: "Photo",
        register: "Register",
        measurementUnit: "Measurement unit"
    },
    article: {
        name: "Name",
        transportFee: "Transport fee",
        photo: "Photo",
        articleFamily: "Article family",
    },
    source: {
        name: "Name",
        description: "Description"
    },
    company: {
        address: "Address",
        phoneNumber: "Phone Number",
        email: "Email",
        name: "Name",
        taxId: "Tax Id"
    },
    individual: {
        address: "Address",
        phoneNumber: "Phone Number",
        email: "Email",
        firstName: "First Name",
        lastName: "Last Name",
        nationalId: "National Id"
    },
    input: {
        dateTime: "Date",
        number: "Number",
        year: "Year",
        register: "Register",
        subRegister: "Sub-register",
        source: "Source",
        owner: "Owner",
        status: "Status",
        total: "Total"
    },
    inputStatuses: {
        fullyOut: "Fully out",
        partiallyOut: "Partially out",
        fullyIn: "Fully in"
    },
    operationLine: {
        article: "Article",
        quantity: "Quantity",
        nightlyAmount: "Amount / night",
        subTotalNightlyAmount: "Sub-total / night",
        transportFee: "Transport fee"
    },
    currency: {
        tn: "TND"
    },
    roles: {
        admin: "Admin",
        manager: "Manager",
        operator: "Operator"
    },
    calculationMethods: {
        perUnit: "Per unit",
        perBatch: "Per batch"
    },
    owners: {
        companies: "Companies",
        individuals: "Individuals"
    }
} as const;

export default glossary