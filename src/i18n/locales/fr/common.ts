import Common from "../types/Common";

const common: Common = {
    buttons: {
        cancel: "Annuler",
        confirm: "Confirmer",
        login: "Se connecter",
        logout: "Déconnexion"
    },
    forms: {
        email: "Email",
        password: "Mot de passe"
    },
    locales: {
        ar: "Arabe",
        en: "Anglais",
        fr: "Français"
    },
    components: {
        loginForm: {
            forgotPassword: "Mot de passe oublié ?"
        }
    }
} as const;

export default common