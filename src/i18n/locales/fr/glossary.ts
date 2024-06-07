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
        nightlyAmount: "Montant / nuit",
        calculationMethod: "Méthode de calcul",
        photo: "Photo",
        register: "Registre",
        measurementUnit: "Unité de mesure"
    },
    article: {
        name: "Nom",
        transportFee: "Frais de transport",
        photo: "Photo",
        articleFamily: "Famille d'articles",
    },
    source: {
        name: "Nom",
        description: "Description"
    },
    company: {
        address: "Adresse",
        phoneNumber: "Numéro de téléphone",
        email: "Email",
        name: "Raison sociale",
        taxId: "Matricule fiscale"
    },
    individual: {
        address: "Adresse",
        phoneNumber: "Numéro de téléphone",
        email: "Email",
        firstName: "Prénom",
        lastName: "Nom de famille",
        nationalId: "CIN"
    },
    input: {
        dateTime: "Date",
        number: "Numéro",
        year: "Année",
        register: "Registre",
        subRegister: "Sous-registre",
        source: "Source",
        owner: "Propriétaire",
        status: "Statut",
        total: "Total"
    },
    inputStatuses: {
        fullyOut: "Entièrement sortie",
        partiallyOut: "Partiellement sortie",
        fullyIn: "Entièrement entrée"
    },
    inputOperationLine: {
        article: "Article",
        quantity: "Quantité",
        nightlyAmount: "Montant / nuit",
        subTotalNightlyAmount: "Sous-total / nuit",
        transportFee: "Frais de transport",
        remainingQuantity: "Quantité restante",
        status: "Statut",
        description: "Description",
        observation: "Observation",
        note: "Remarque",
        photo: "Photo"
    },
    inputOperationLineStatuses: {
        fullyOut: "Entièrement sortie",
        partiallyOut: "Partiellement sortie",
        fullyIn: "Entièrement entrée"
    },
    currency: {
        tn: "TND"
    },
    roles: {
        admin: "Admin",
        manager: "Manager",
        operator: "Opérateur"
    },
    calculationMethods: {
        perUnit: "Par unité",
        perBatch: "Par lot"
    },
    owners: {
        companies: "Personnes morales",
        individuals: "Personnes physiques"
    }
} as const;

export default glossary