import Common from "../types/Common";

const common: Common = {
    applicationName: "Impound Management Application",
    buttons: {
        cancel: "Cancel",
        confirm: "Confirm",
        login: "Sign in",
        logout: "Logout",
        save: "Save",
        saveChanges: "Save changes",
        add: "Add",
        removeModification: "Remove modification",
        update: "Update",
        close: "Close",
        search: "Search",
        export: "Export"
    },
    labels: {
        noFilter: "No filter",
        advancedFilters: "Advanced filters"
    },
    locales: {
        ar: "Arabic",
        en: "English",
        fr: "French"
    },
    months: {
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December"
    },
    menu: {
        dashboard: "Dashboard",
        myAccount: "My account",
        institution: "Institution",
        basicData: {
            index: "Basic data",
            warehouses: "Warehouses management",
            registers: "Registers management",
            subRegisters: "Sub-registers management",
            measurementUnits: "Measurement units management",
            articleFamilies: "Article families management",
            articles: "Articles management",
            sources: "Sources management",
            owners: "Owners management",
        },
        operations: {
            index: "Operations",
            inputs: "Inputs management",
            outputs: "Outputs management"
        },
        administration: {
            index: "Administration",
            userAccountsManagement: "Users management"
        }
    },
    components: {
        loginForm: {
            forgotPassword: "Forgot password?"
        },
        changePasswordForm: {
            currentPassword: "Current password",
            newPassword: "New password",
            confirmNewPassword: "Confirm new password"
        },
        upsertUserModal: {
            title: {
                onInsert: "Add new user account",
                onUpdate: "Update user account"
            }
        },
        upsertEmployeeModal: {
            title: {
                onInsert: "Add new employee",
                onUpdate: "Update employee"
            }
        },
        upsertWarehouseModal: {
            title: {
                onInsert: "Add new warehouse",
                onUpdate: "Update warehouse"
            }
        },
        upsertRegisterModal: {
            title: {
                onInsert: "Add new register",
                onUpdate: "Update register"
            }
        },
        upsertSubRegisterModal: {
            title: {
                onInsert: "Add new sub-register",
                onUpdate: "Update sub-register"
            }
        },
        upsertMeasurementUnitModal: {
            title: {
                onInsert: "Add new measurement unit",
                onUpdate: "Update measurement unit"
            }
        },
        upsertArticleFamilyModal: {
            title: {
                onInsert: "Add new article family",
                onUpdate: "Update article family"
            }
        },
        upsertArticleModal: {
            title: {
                onInsert: "Add new article",
                onUpdate: "Update article"
            }
        },
        upsertSourceModal: {
            title: {
                onInsert: "Add new source",
                onUpdate: "Update source"
            }
        },
        upsertCompanyModal: {
            title: {
                onInsert: "Add new articles owner (Company)",
                onUpdate: "Update articles owner (Company)"
            }
        },
        upsertIndividualModal: {
            title: {
                onInsert: "Add new articles owner (Individual)",
                onUpdate: "Update articles owner (Individual)"
            }
        },
        upsertInputOperationLineModal: {
            title: {
                onInsert: "Add new input operation line",
                onUpdate: "Update input operation line"
            }
        },
        confirmationModal: {
            title: "Confirmation",
            text: "This action is destructive and you will have to contact support to restore your data.",
        },
        usersActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this user account?"
            }
        },
        employeesActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this employee?"
            }
        },
        warehousesActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this warehouse?"
            }
        },
        registersActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this register?"
            }
        },
        subRegistersActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this sub-register?"
            }
        },
        measurementUnitsActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this measurement unit?"
            }
        },
        articleFamiliesActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this article family?"
            }
        },
        articlesActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this article?"
            }
        },
        sourcesActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this source?"
            }
        },
        companiesActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this owner?"
            }
        },
        individualsActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this owner?"
            }
        },
        inputsActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this input?"
            }
        },
        outputsActions: {
            confirmationModal: {
                message: "Are you sure you want to delete this output?"
            }
        },
        inputOperationLineTRow: {
            confirmationModal: {
                message: "Are you sure you want to delete this input operation line?"
            }
        },
        upsertInputForm: {
            operationLinesTable: {
                title: "Details about what was seized"
            },
            totalQuantity: "Total quantity",
            totalNightlyAmount: "Total amount / night",
            totalTransportFee: "Total transport fee / night"
        },
        dataTablePagination: {
            summary: "{{start}} - {{end}} of {{total}}"
        },
        infoDetailsModal: {
            title: "Details"
        },
        fileDropzone: {
            message: "Drag a file here or click to upload",
            note: "File should not exceed {{limit}}mb"
        },
        operationsQuantityStatisticsForm: {
            title: "Impoundment statistics for the year",
            quantityDistributionBy: {
                title: "Quantity distribution by",
                options: {
                    months: "Months",
                    days: "Days"
                }
            },
            filteringBy: {
                title: "Filtering by",
                options: {
                    notSpecified: "Not specified",
                    register: "Register",
                    articleFamily: "Article family"
                }
            }
        },
        incomeStatisticsForm: {
            title: "Income statistics from municipal seizures for the year",
            incomeDistributionBy: {
                title: "Income distribution by",
                options: {
                    months: "Months",
                    days: "Days"
                }
            },
            filteringBy: {
                title: "Filtering by",
                options: {
                    notSpecified: "Not specified",
                    register: "Register",
                    articleFamily: "Article family"
                }
            }
        },
        operationsQuantityStatisticsChart: {
            quantities: "Quantities",
            inputQuantity: "Input quantity",
            outputQuantity: "Output quantity",
            title: "Impoundment statistics"
        },
        IncomeStatisticsChart: {
            income: "Income",
            title: "Income statistics from municipal seizures"
        },
        operationsQuantityStatisticsTable: {
            days: "Days",
            months: "Months",
            inputQuantity: "Input quantity",
            outputQuantity: "Output quantity",
        },
        incomeStatisticsTable: {
            days: "Days",
            months: "Months",
            income: "Income",
        }
    }
} as const;

export default common