import Common from "../types/Common";

const common: Common = {
    buttons: {
        cancel: "Cancel",
        confirm: "Confirm",
        login: "Sign in",
        logout: "Logout"
    },
    forms: {
        email: "Email",
        password: "Password"
    },
    locales: {
        ar: "Arabic",
        en: "English",
        fr: "French"
    },
    components: {
        loginForm: {
            forgotPassword: "Forgot password?"
        }
    }
} as const;

export default common