import Common from "../types/Common";

const common: Common = {
    applicationName: "تطبيق لإدارة الحجز",
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
        noFilter: "بدون تصفية",
        advancedFilters: "تصفية متقدمة"
    },
    locales: {
        ar: "العربية",
        en: "الإنجليزية",
        fr: "الفرنسية"
    },
    menu: {
        dashboard: "لوحة القيادة",
        myProfile: "ملفي الشخصي",
        institution: "المؤسسة",
        basicData: {
            index: "البيانات الأساسية",
            warehouses: "إدارة المستودعات",
            registers: "إدارة السِّجلاَّت",
            subRegisters: "إدارة السِّجلاَّت الفرعية",
            measurementUnits: "إدارة وحدات القياس",
            articleFamilies: "إدارة أصناف المحجوزات",
            articles: "إدارة المحجوزات",
            sources: "إدارة سُلطات الحجز",
            owners: "إدارة مالكي المحجوزات",
        },
        operations: {
            index: "العمليات",
            inputs: "إدارة عمليات الدخول",
            outputs: "إدارة عمليات الخروج"
        },
        administration: {
            index: "الإدارة",
            userAccountsManagement: "إدارة حسابات المستخدمين"
        },
        security: {
            index: "حماية",
            changePassword: "تغيير كلمة المرور"
        }
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
        upsertCompanyModal: {
            title: {
                onInsert: "إضافة مالك محجوزات جديد (شخص معنوي)",
                onUpdate: "تحديث بيانات مالك محجوزات (شخص معنوي)"
            }
        },
        upsertIndividualModal: {
            title: {
                onInsert: "إضافة مالك محجوزات جديد (شخص طبيعي)",
                onUpdate: "تحديث بيانات مالك محجوزات (شخص طبيعي)"
            }
        },
        upsertInputOperationLineModal: {
            title: {
                onInsert: "إضافة عنصر محجوزات جديد",
                onUpdate: "تحديث بيانات عنصر المحجوزات"
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
        companiesActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف مالك المحجوزات هذا ؟"
            }
        },
        individualsActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف مالك المحجوزات هذا ؟"
            }
        },
        inputsActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف هذا الحجز ؟"
            }
        },
        outputsActions: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف عملية الخروج هذه ؟"
            }
        },
        inputOperationLineTRow: {
            confirmationModal: {
                message: "هل أنت متأكد أنك تريد حذف عنصر المحجوزات هذا ؟"
            }
        },
        upsertInputForm: {
            operationLinesTable: {
                title: "تفاصيل حول المحجوز"
            },
            totalQuantity: "الكمية الإجمالية",
            totalNightlyAmount: "المبلغ الإجمالي / الليلة",
            totalTransportFee: "إجمالي تكاليف النقل / الليلة"
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