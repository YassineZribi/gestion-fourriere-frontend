type Glossary = {
    user: {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        role: string
    },
    institution: {
        name: string,
        address: string,
        email: string,
        phoneNumber: string,
        manager: string
    },
    employee: {
        firstName: string,
        lastName: string,
        position: string,
        manager: string
    },
    warehouse: {
        name: string,
        address: string,
        latitude: string,
        longitude: string,
        manager: string
    },
    register: {
        name: string,
        observation: string
    },
    subRegister: {
        name: string,
        description: string,
        register: string
    },
    measurementUnit: {
        name: string,
        symbol: string
    },
    articleFamily: {
        name: string,
        description: string,
        nightlyAmount: string,
        calculationMethod: string,
        photo: string,
        register: string,
        measurementUnit: string
    },
    article: {
        name: string,
        transportFee: string,
        photo: string,
        articleFamily: string,
    },
    source: {
        name: string,
        description: string
    },
    company: {
        address: string,
        phoneNumber: string,
        email: string,
        name: string,
        taxId: string
    },
    individual: {
        address: string,
        phoneNumber: string,
        email: string,
        firstName: string,
        lastName: string,
        nationalId: string
    },
    roles: {
        admin: string,
        manager: string,
        operator: string
    },
    calculationMethods: { // or paymentCalculationMethods
        perUnit: string,
        perBatch: string
    },
    owners: {
        companies: string,
        individuals: string
    }
};

export default Glossary