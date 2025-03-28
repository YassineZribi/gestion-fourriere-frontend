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
        email: string,
        phoneNumber: string,
        role: string,
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
    input: {
        dateTime: string,
        number: string,
        year: string,
        address: string,
        latitude: string,
        longitude: string,
        register: string,
        subRegister: string,
        source: string,
        owner: string,
        status: string,
        total: string
    },
    inputStatuses: {
        fullyOut: string,
        partiallyOut: string,
        fullyIn: string
    },
    inputOperationLine: {
        article: string,
        quantity: string,
        nightlyAmount: string,
        subTotalNightlyAmount: string,
        transportFee: string,
        remainingQuantity: string,
        status: string,
        description: string,
        observation: string,
        note: string,
        photo: string,
    },
    inputOperationLineStatuses: {
        fullyOut: string,
        partiallyOut: string,
        fullyIn: string
    },
    output: {
        dateTime: string,
        number: string,
        year: string,
        nightCount: string,
        totalTransportFee: string,
        totalPaymentAmountWithoutDiscount: string,
        discountAmount: string,
        discountObservation: string,
        discount: string,
        totalPaymentAmount: string,
        receiptNumber: string,
        receiptDateTime: string,
        receiptAmount: string
    },
    outputOperationLine: {
        quantity: string
    },
    currency: {
        tn: string
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