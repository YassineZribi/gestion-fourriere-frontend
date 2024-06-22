import Common from "../types/Common";

const common: Common = {
    applicationName: "Application de gestion de fourrière",
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
        noFilter: "Pas de filtre",
        advancedFilters: "Filtres avancés"
    },
    locales: {
        ar: "Arabe",
        en: "Anglais",
        fr: "Français"
    },
    menu: {
        dashboard: "Tableau de bord",
        myProfile: "Mon profil",
        institution: "Établissement",
        basicData: {
            index: "Données de base",
            warehouses: "Gestion des dépôts",
            registers: "Gestion des registres",
            subRegisters: "Gestion des sous-registres",
            measurementUnits: "Gestion des unités de mesure",
            articleFamilies: "Gestion des familles d'articles",
            articles: "Gestion des articles",
            sources: "Gestion des sources",
            owners: "Gestion des propriétaires",
        },
        operations: {
            index: "Opérations",
            inputs: "Gestion des entrées",
            outputs: "Gestion des sorties"
        },
        administration: {
            index: "Administration",
            userAccountsManagement: "Gestion des comptes utilisateurs"
        },
        security: {
            index: "Sécurité",
            changePassword: "Changer le mot de passe"
        }
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
        upsertInputOperationLineModal: {
            title: {
                onInsert: "Ajouter une nouevelle ligne d'entrée",
                onUpdate: "Modifier les données de la ligne d'entrée"
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
        outputsActions: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer cette sortie ?"
            }
        },
        inputOperationLineTRow: {
            confirmationModal: {
                message: "Êtes-vous sûr de vouloir supprimer cette ligne d'entrée ?"
            }
        },
        upsertInputForm: {
            operationLinesTable: {
                title: "Détails sur les articles saisis"
            },
            totalQuantity: "Quantité totale",
            totalNightlyAmount: "Montant total / nuit",
            totalTransportFee: "Frais de transport totaux / nuit"
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