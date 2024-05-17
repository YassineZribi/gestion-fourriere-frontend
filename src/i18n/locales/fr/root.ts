import Root from "../types/Root";

const root: Root = {
    login: {
        title: "Bienvenue à nouveau !"
    },
    profile: {
        title: "Mon profil"
    },
    institution: {
        tabs: {
            profile: "Profil",
            employees: "Employés",
            chart: "Organigramme"
        }
    },
    changePassword: {
        title: "Changer le mot de passe"
    },
    userAccountsManagement: {
        title: "Gestion des comptes utilisateurs"
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
    notFound: {
        title: "Quelque chose ne va pas...",
        description: "La page que vous essayez d'ouvrir n'existe pas. Il se peut que vous ayez mal saisi l'adresse ou que la page ait été déplacée vers une autre URL. Si vous pensez qu'il s'agit d'une erreur, contactez l'assistance.",
        back: "Retour à la page d'accueil"
    }
} as const;

export default root