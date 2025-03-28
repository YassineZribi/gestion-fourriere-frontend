import Root from "../types/Root";

const root: Root = {
    login: {
        title: "Bienvenue à nouveau !"
    },
    myAccount: {
        tabs: {
            profile: "Profil",
            changePassword: "Changer le mot de passe"
        }
    },
    institution: {
        tabs: {
            profile: "Profil",
            employees: "Employés",
            chart: "Organigramme"
        }
    },
    userAccountsManagement: {
        title: "Gestion des utilisateurs"
    },
    warehousesManagement: {
        title: "Gestion des dépôts"
    },
    registersManagement: {
        title: "Gestion des registres"
    },
    subRegistersManagement: {
        title: "Gestion des sous-registres"
    },
    measurementUnitsManagement: {
        title: "Gestion des unités de mesure"
    },
    articleFamiliesManagement: {
        title: "Gestion des familles d'articles"
    },
    articlesManagement: {
        title: "Gestion des articles"
    },
    sourcesManagement: {
        title: "Gestion des sources"
    },
    ownersManagement: {
        title: "Gestion des propriétaires des articles"
    },
    inputsManagement: {
        title: "Gestion des entrées"
    },
    outputsManagement: {
        title: "Gestion des sorties"
    },
    upsertInput: {
        title: {
            onInsert: "Ajouter une nouvelle entrée",
            onUpdate: "Modifier les données de l'entrée"
        }
    },
    insertOutput: {
        title: "Ajouter une nouvelle sortie"
    },
    notFound: {
        title: "Quelque chose ne va pas...",
        description: "La page que vous essayez d'ouvrir n'existe pas. Il se peut que vous ayez mal saisi l'adresse ou que la page ait été déplacée vers une autre URL. Si vous pensez qu'il s'agit d'une erreur, contactez l'assistance.",
        back: "Retour à la page d'accueil"
    }
} as const;

export default root