import Glossary from "../types/Glossary";

const glossary: Glossary = {
    user: {
        email: "Email",
        password: "Mot de passe",
        firstName: "Prénom",
        lastName: "Nom de famille",
        phoneNumber: "Numéro de téléphone",
        role: "Rôle"
    },
    institution: {
        name: "Nom",
        address: "Adresse",
        email: "Email",
        phoneNumber: "Numéro de téléphone",
        manager: "Directeur" // ou "Responsable"
    },
    employee: {
        firstName: "Prénom",
        lastName: "Nom de famille",
        position: "Poste",
        manager: "Directeur"
    },
    warehouse: {
        name: "Nom",
        address: "Adresse",
        latitude: "Latitude",
        longitude: "Longitude",
        manager: "Responsable"
    },
    register: {
        name: "Nom",
        observation: "Observation"
    },
    subRegister: {
        name: "Nom",
        description: "Description",
        register: "Registre"
    },
    measurementUnit: {
        name: "Nom",
        symbol: "Symbole"
    },
    articleFamily: {
        name: "Nom",
        description: "Description",
        nightlyAmount: "Montant / nuit (TND)",
        calculationMethod: "Méthode de calcul",
        photo: "Photo",
        register: "Registre",
        measurementUnit: "Unité de mesure"
    },
    article: {
        name: "Nom",
        transportFee: "Frais de transport (TND)",
        photo: "Photo",
        articleFamily: "Famille d'articles",
    },
    source: {
        name: "Nom",
        description: "Description"
    },
    roles: {
        admin: "Admin",
        manager: "Manager",
        operator: "Opérateur"
    },
    calculationMethods: {
        perUnit: "Par unité",
        perBatch: "Par lot"
    }
} as const;

export default glossary