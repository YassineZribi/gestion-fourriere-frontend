type Root = {
    login: {
        title: string
    },
    myAccount: {
        tabs: {
            profile: string,
            changePassword: string
        }
    },
    institution: {
        tabs: {
            profile: string,
            employees: string,
            chart: string
        }
    },
    userAccountsManagement: {
        title: string
    },
    warehousesManagement: {
        title: string
    },
    registersManagement: {
        title: string
    },
    subRegistersManagement: {
        title: string
    },
    measurementUnitsManagement: {
        title: string
    },
    articleFamiliesManagement: {
        title: string
    },
    articlesManagement: {
        title: string
    },
    sourcesManagement: {
        title: string
    },
    ownersManagement: {
        title: string
    },
    inputsManagement: {
        title: string
    },
    outputsManagement: {
        title: string
    },
    upsertInput: {
        title: {
            onInsert: string,
            onUpdate: string
        }
    },
    insertOutput: {
        title: string
    },
    notFound: {
        title: string,
        description: string,
        back: string
    }
};

export default Root