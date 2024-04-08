import Common from "../types/Common";

const common: Common = {
    buttons: {
        cancel: "إلغاء",
        confirm: "تأكيد",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج"
    },
    forms: {
        email: "البريد الإلكتروني",
        password: "كلمة المرور"
    },
    locales: {
        ar: "العربية",
        en: "الإنجليزية",
        fr: "الفرنسية"
    },
    components: {
        loginForm: {
            forgotPassword: "نسيت كلمة المرور؟"
        }
    }
} as const;

export default common