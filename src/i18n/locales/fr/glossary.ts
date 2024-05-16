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
    roles: {
        admin: "Admin",
        manager: "Manager",
        operator: "Opérateur"
    }
} as const;

export default glossary