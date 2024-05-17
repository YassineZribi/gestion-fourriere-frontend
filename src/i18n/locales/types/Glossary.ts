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
    roles: {
        admin: string,
        manager: string,
        operator: string
    }
};

export default Glossary