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
        upsertMeasurementUnitModal: {
            title: {
                onInsert: "Ajouter une nouvelle unité de mesure",
                onUpdate: "Modifier les données de l'unité de mesure"
            }
        },
        upsertArticleFamilyModal: {
            title: {
                onInsert: "Ajouter une nouvelle famille d'articles",
                onUpdate: "Modifier les données de la famille d'articles"
            }
        },
        upsertArticleModal: {
            title: {
                onInsert: "Ajouter un nouvel article",
                onUpdate: "Modifier les données de l'article"
            }
        },
        upsertSourceModal: {
            title: {
                onInsert: "Ajouter une nouvelle source",
                onUpdate: "Modifier les données de la source"
            }
        },
        upsertCompanyModal: {
            title: {
                onInsert: "Ajouter un nouveau propriétaire d'articles (Personne morale)",
                onUpdate: "Modifier les données du propriétaire d'articles (Personne morale)"
            }
        },
        upsertIndividualModal: {
            title: {
                onInsert: "Ajouter un nouveau propriétaire d'articles (Personne physique)",
                onUpdate: "Modifier les données du propriétaire d'articles (Personne physique)"
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
        measurementUnitsActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer cette unité de mesure ?"
            }
        },
        articleFamiliesActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer cette famille d'articles ?"
            }
        },
        articlesActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer cet article ?"
            }
        },
        sourcesActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer cette source ?"
            }
        },
        companiesActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer ce propriétaire d'articles ?"
            }
        },
        individualsActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer ce propriétaire d'articles ?"
            }
        },
        inputsActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer cette entrée ?"
            }
        },
        upsertInputForm: {
            operationLinesTable: {
                title: "Détails sur les articles saisis"
            },
            totalQuantity: "Quantité totale",
            totalNightlyAmount: "Montant total / nuit",
            totalTransportFee: "Total des frais de transport / nuit"
        },
        dataTablePagination: {
            summary: "{{start}} - {{end}} de {{total}}"
        },
        infoDetailsModal: {
            title: "Détails"
        },
        fileDropzone: {
            message: "Faites glisser un fichier ici ou cliquez pour le télécharger",
            note: "Le fichier ne doit pas dépasser {{limit}} Mo"
        }
    }
} as const;

export default common