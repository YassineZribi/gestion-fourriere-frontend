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
        email: "البريد الإلكتروني",
        phoneNumber: "رقم الهاتف",
        role: "الدّور",
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
        nightlyAmount: "المبلغ / الليلة",
        calculationMethod: "طريقة الاحتساب",
        photo: "الصورة",
        register: "السِّجل",
        measurementUnit: "وحدة القياس"
    },
    article: {
        name: "الإسم",
        transportFee: "رسوم النقل",
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
        dateTime: "تاريخ الحجز",
        number: "رقم الحجز",
        year: "سنة الحجز",
        address: "العنوان",
        latitude: "خط العرض",
        longitude: "خط الطول",
        register: "السِّجل",
        subRegister: "السِّجل الفرعي",
        source: "السُّلطة الحاجزة",
        owner: "المخالف",
        status: "الحالة",
        total: "الإجمالي"
    },
    inputStatuses: {
        fullyOut: "خروج كامل",
        partiallyOut: "خروج جزئي",
        fullyIn: "في الداخل"
    },
    inputOperationLine: {
        article: "المحجوز",
        quantity: "الكمية",
        nightlyAmount: "المبلغ / الليلة",
        subTotalNightlyAmount: "الإجمالي الفرعي / الليلة",
        transportFee: "رسوم النقل",
        remainingQuantity: "الكمية المتبقية",
        status: "الحالة",
        description: "الوصف",
        observation: "ملاحظة 1",
        note: "ملاحظة 2",
        photo: "الصورة"
    },
    inputOperationLineStatuses: {
        fullyOut: "خروج كامل",
        partiallyOut: "خروج جزئي",
        fullyIn: "في الداخل"
    },
    output: {
        dateTime: "تاريخ الخروج",
        number: "رقم الخروج",
        year: "سنة الخروج",
        nightCount: "عدد الليالي",
        totalTransportFee: "إجمالي رسوم النقل",
        totalPaymentAmountWithoutDiscount: "المبلغ الإجمالي للدفع بدون خصم",
        discountAmount: "قيمة الخصم",
        discountObservation: "ملاحظة الخصم",
        discount: "الخصم",
        totalPaymentAmount: "المبلغ الإجمالي للدفع",
        receiptNumber: "رقم الوصل",
        receiptDateTime: "تاريخ الوصل",
        receiptAmount: "مبلغ الوصل"
    },
    outputOperationLine: {
        quantity: "الكمّية المراد استخراجها"
    },
    currency: {
        tn: "د.ت"
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