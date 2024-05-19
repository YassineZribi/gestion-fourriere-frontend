import Root from "../types/Root";

const root: Root = {
    login: {
        title: "Welcome back!"
    },
    profile: {
        title: "My profile"
    },
    institution: {
        tabs: {
            profile: "Profile",
            employees: "Employees",
            chart: "Organizational chart"
        }
    },
    changePassword: {
        title: "Change password"
    },
    userAccountsManagement: {
        title: "User accounts management"
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
    notFound: {
        title: "Something is not right...",
        description: "Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.",
        back: "Back to home page"
    }
} as const;

export default root