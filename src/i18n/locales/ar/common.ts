import Common from "../types/Common";

const common: Common = {
    buttons: {
        cancel: "إلغاء",
        confirm: "تأكيد",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        save: "حفظ",
        saveChanges: "حفظ التغييرات",
        add: "إضافة",
        removeModification: "إزالة التعديل",
        update: "تغيير",
        close: "إغلاق"
    },
    labels: {
        noFilter: "بدون تصفية"
    },
    locales: {
        ar: "العربية",
        en: "الإنجليزية",
        fr: "الفرنسية"
    },
    components: {
        loginForm: {
            forgotPassword: "نسيت كلمة المرور؟"
        },
        changePasswordForm: {
            currentPassword: "كلمة المرور الحالية",
            newPassword: "كلمة المرور الجديدة",
            confirmNewPassword: "تأكيد كلمة المرور الجديدة"
        },
        upsertUserModal: {
            title: {
                onInsert: "إضافة حساب مستخدم جديد",
                onUpdate: "تحديث حساب المستخدم"
            }
        },
        upsertEmployeeModal: {
            title: {
                onInsert: "إضافة موظف جديد",
                onUpdate: "تحديث بيانات الموظف"
            }
        },
        upsertWarehouseModal: {
            title: {
                onInsert: "إضافة مستودع جديد",
                onUpdate: "تحديث بيانات المستودع"
            }
        },
        upsertRegisterModal: {
            title: {
                onInsert: "إضافة سِجل جديد",
                onUpdate: "تحديث بيانات السِّجل"
            }
        },
        confirmationModal: {
            title: "التأكيد",
            text: "هذا الإجراء مدمر وسيتعين عليك الاتصال بالدعم لاستعادة بياناتك."
        },
        usersActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف حساب المستخدم هذا ؟"
            }
        },
        employeesActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف هذا الموظف ؟"
            }
        },
        warehousesActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف هذا المستودع ؟"
            }
        },
        registersActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف هذا السِّجل ؟"
            }
        },
        dataTablePagination: {
            summary: "{{start}} - {{end}} من {{total}}",
        },
        infoDetailsModal: {
            title: "التفاصيل"
        }
    }
} as const;

export default common