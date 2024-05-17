import Common from "../types/Common";

const common: Common = {
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
        close: "Close"
    },
    labels: {
        noFilter: "No filter"
    },
    locales: {
        ar: "Arabic",
        en: "English",
        fr: "French"
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
        dataTablePagination: {
            summary: "{{start}} - {{end}} of {{total}}"
        },
        infoDetailsModal: {
            title: "Details"
        }
    }
} as const;

export default common