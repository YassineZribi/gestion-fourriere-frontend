import Glossary from "../types/Glossary";

const glossary: Glossary = {
    user: {
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        firstName: "الإسم",
        lastName: "اللّقب",
        phoneNumber: "رقم الهاتف",
        role: "الدّور"
    },
    institution: {
        name: "الإسم",
        address: "العنوان",
        email: "البريد الإلكتروني",
        phoneNumber: "رقم الهاتف",
        manager: "المدير"
    },
    employee: {
        firstName: "الإسم",
        lastName: "اللّقب",
        position: "المنصب",
        manager: "المدير"
    },
    warehouse: {
        name: "الإسم",
        address: "العنوان",
        latitude: "خط العرض",
        longitude: "خط الطول",
        manager: "المسؤول"
    },
    register: {
        name: "الإسم",
        observation: "ملاحظة"
    },
    subRegister: {
        name: "الإسم",
        description: "الوصف",
        register: "السِّجل"
    },
    roles: {
        admin: "مشرف إداري",
        manager: "مدير",
        operator: "مشغّل"
    }
} as const;

export default glossary