import Common from "../types/Common";

const common: Common = {
    buttons: {
        cancel: "Annuler",
        confirm: "Confirmer",
        login: "Se connecter",
        logout: "Déconnexion",
        save: "Enregistrer",
        saveChanges: "Enregistrer les modifications",
        add: "Ajouter",
        removeModification: "Supprimer la modification",
        update: "Mettre à jour",
        close: "Fermer"
    },
    labels: {
        noFilter: "Pas de filtre"
    },
    locales: {
        ar: "Arabe",
        en: "Anglais",
        fr: "Français"
    },
    components: {
        loginForm: {
            forgotPassword: "Mot de passe oublié ?"
        },
        changePasswordForm: {
            currentPassword: "Mot de passe actuel",
            newPassword: "Nouveau mot de passe",
            confirmNewPassword: "Confirmer le nouveau mot de passe"
        },
        upsertUserModal: {
            title: {
                onInsert: "Ajouter un nouveau compte utilisateur",
                onUpdate: "Modifier les données de l'utilisateur"
            }
        },
        upsertEmployeeModal: {
            title: {
                onInsert: "Ajouter un nouvel employé",
                onUpdate: "Modifier les données de l'employé"
            }
        },
        upsertWarehouseModal: {
            title: {
                onInsert: "Ajouter un nouveau dépôt",
                onUpdate: "Modifier les données du dépôt"
            }
        },
        upsertRegisterModal: {
            title: {
                onInsert: "Ajouter un nouveau registre",
                onUpdate: "Modifier les données du registre"
            }
        },
        upsertSubRegisterModal: {
            title: {
                onInsert: "Ajouter un nouveau sous-registre",
                onUpdate: "Modifier les données du sous-registre"
            }
        },
        confirmationModal: {
            title: "Confirmation",
            text: "Cette action est destructrice et vous devrez contacter l'assistance pour restaurer vos données."
        },
        usersActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer ce compte utilisateur ?"
            }
        },
        employeesActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer cet employé ?"
            }
        },
        warehousesActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer ce dépôt ?"
            }
        },
        registersActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer ce registre ?"
            }
        },
        subRegistersActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer ce sous-registre ?"
            }
        },
        dataTablePagination: {
            summary: "{{start}} - {{end}} de {{total}}"
        },
        infoDetailsModal: {
            title: "Détails"
        }
    }
} as const;

export default common