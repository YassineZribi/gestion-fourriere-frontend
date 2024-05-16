type Root = {
    login: {
        title: string
    },
    profile: {
        title: string
    },
    institution: {
        tabs: {
            profile: string,
            employees: string,
            chart: string
        }
    },
    changePassword: {
        title: string
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
    notFound: {
        title: string,
        description: string,
        back: string
    }
};

export default Root