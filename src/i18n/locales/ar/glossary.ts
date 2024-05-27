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
    measurementUnit: {
        name: "الإسم",
        symbol: "الرَّمز"
    },
    articleFamily: {
        name: "الإسم",
        description: "الوصف",
        nightlyAmount: "المبلغ / الليلة (د.ت)",
        calculationMethod: "طريقة الاحتساب",
        photo: "الصورة",
        register: "السِّجل",
        measurementUnit: "وحدة القياس"
    },
    article: {
        name: "الإسم",
        transportFee: "(د.ت) تكاليف النقل",
        photo: "الصورة",
        articleFamily: "صنف المحجوزات",
    },
    source: {
        name: "الإسم",
        description: "الوصف"
    },
    company: {
        address: "العنوان",
        phoneNumber: "رقم الهاتف",
        email: "البريد الإلكتروني",
        name: "اسم الشركة",
        taxId: "المُعرٍف الجبائي"
    },
    individual: {
        address: "العنوان",
        phoneNumber: "رقم الهاتف",
        email: "البريد الإلكتروني",
        firstName: "الإسم",
        lastName: "اللّقب",
        nationalId: "رقم ب.ت.و"
    },
    input: {
        dateTime: "التاريخ",
        number: "الرقم",
        year: "السَّنة",
        register: "السِّجل",
        subRegister: "السِّجل الفرعي",
        source: "السُّلطة الحاجزة",
        owner: "المخالف"
    },
    roles: {
        admin: "مشرف إداري",
        manager: "مدير",
        operator: "مشغّل"
    },
    calculationMethods: {
        perUnit: "لكل وحدة",
        perBatch: "لكل دفعة"
    },
    owners: {
        companies: "أشخاص معنوية",
        individuals: "أشخاص طبيعية"
    }
} as const;

export default glossary