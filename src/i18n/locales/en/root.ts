import Root from "../types/Root";

const root: Root = {
    login: {
        title: "Welcome back!"
    },
    myAccount: {
        tabs: {
            profile: "Profile",
            changePassword: "Change password"
        }
    },
    institution: {
        tabs: {
            profile: "Profile",
            employees: "Employees",
            chart: "Organizational chart"
        }
    },
    userAccountsManagement: {
        title: "Users management"
    },
    warehousesManagement: {
        title: "Warehouses management"
    },
    registersManagement: {
        title: "Registers management"
    },
    subRegistersManagement: {
        title: "Sub-registers management"
    },
    measurementUnitsManagement: {
        title: "Measurement units management"
    },
    articleFamiliesManagement: {
        title: "Article families management"
    },
    articlesManagement: {
        title: "Articles management"
    },
    sourcesManagement: {
        title: "Sources management"
    },
    ownersManagement: {
        title: "Article owners management"
    },
    inputsManagement: {
        title: "Inputs management"
    },
    outputsManagement: {
        title: "Outputs management"
    },
    upsertInput: {
        title: {
            onInsert: "Add new input",
            onUpdate: "Update input"
        }
    },
    insertOutput: {
        title: "Add new output"
    },
    notFound: {
        title: "Something is not right...",
        description: "Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.",
        back: "Back to home page"
    }
} as const;

export default root