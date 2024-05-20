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
        upsertSubRegisterModal: {
            title: {
                onInsert: "إضافة سِجل فرعي جديد",
                onUpdate: "تحديث بيانات السِّجل الفرعي"
            }
        },
        upsertMeasurementUnitModal: {
            title: {
                onInsert: "إضافة وحدة قياس جديدة",
                onUpdate: "تحديث بيانات وحدة القياس"
            }
        },
        upsertArticleFamilyModal: {
            title: {
                onInsert: "إضافة صنف محجوزات جديد",
                onUpdate: "تحديث بيانات صنف المحجوزات"
            }
        },
        upsertArticleModal: {
            title: {
                onInsert: "إضافة محجوز جديد",
                onUpdate: "تحديث بيانات المحجوز"
            }
        },
        upsertSourceModal: {
            title: {
                onInsert: "إضافة سُلطة حاجزة جديدة",
                onUpdate: "تحديث بيانات السُّلطة الحاجزة"
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
        subRegistersActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف هذا السِّجل الفرعي ؟"
            }
        },
        measurementUnitsActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف وحدة القياس هذه ؟"
            }
        },
        articleFamiliesActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف صنف المحجوزات هذا ؟"
            }
        },
        articlesActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف هذا المحجوز ؟"
            }
        },
        sourcesActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف السُّلطة الحاجزة هذه ؟"
            }
        },
        dataTablePagination: {
            summary: "{{start}} - {{end}} من {{total}}",
        },
        infoDetailsModal: {
            title: "التفاصيل"
        },
        fileDropzone: {
            message: "اسحب ملفًا هنا أو انقر للتحميل",
            note: "يجب ألا يتجاوز حجم الملف {{limit}} ميجابايت"
        }
    }
} as const;

export default common