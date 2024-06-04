type Common = {
    buttons: {
        cancel: string,
        confirm: string,
        login: string,
        logout: string,
        save: string,
        saveChanges: string,
        add: string,
        removeModification: string,
        update: string,
        close: string
    },
    labels: {
        noFilter: string
    },
    locales: {
        ar: string,
        en: string,
        fr: string
    },
    components: {
        loginForm: {
            forgotPassword: string
        }
        changePasswordForm: {
            currentPassword: string,
            newPassword: string,
            confirmNewPassword: string,
        },
        upsertUserModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertEmployeeModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertWarehouseModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertRegisterModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertSubRegisterModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertMeasurementUnitModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertArticleFamilyModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertArticleModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertSourceModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertCompanyModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        upsertIndividualModal: {
            title: {
                onInsert: string,
                onUpdate: string
            }
        },
        confirmationModal: {
            title: string,
            text: string
        },
        usersActions: {
            confirmationModal: {
                message: string
            }
        },
        employeesActions: {
            confirmationModal: {
                message: string
            }
        },
        warehousesActions: {
            confirmationModal: {
                message: string
            }
        },
        registersActions: {
            confirmationModal: {
                message: string
            }
        },
        subRegistersActions: {
            confirmationModal: {
                message: string
            }
        },
        measurementUnitsActions: {
            confirmationModal: {
                message: string
            }
        },
        articleFamiliesActions: {
            confirmationModal: {
                message: string
            }
        },
        articlesActions: {
            confirmationModal: {
                message: string
            }
        },
        sourcesActions: {
            confirmationModal: {
                message: string
            }
        },
        companiesActions: {
            confirmationModal: {
                message: string
            }
        },
        individualsActions: {
            confirmationModal: {
                message: string
            }
        },
        inputsActions: {
            confirmationModal: {
                message: string
            }
        },
        upsertInputForm: {
            operationLinesTable: {
                title: string
            },
            totalQuantity: string,
            totalNightlyAmount: string,
            totalTransportFee: string
        },
        dataTablePagination: {
            summary: string
        },
        infoDetailsModal: {
            title: string
        },
        fileDropzone: {
            message: string,
            note: string
        }
    },
};

export default Common