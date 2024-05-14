import Root from "../types/Root";

const root: Root = {
    login: {
        title: "مرحباً بعودتك!"
    },
    profile: {
        title: "ملفّي الشّخصي"
    },
    institution: {
        tabs: {
            profile: "ملف التعريف",
            employees: "الموظفون",
            chart: "الهيكل التنظيمي"
        }
    },
    changePassword: {
        title: "تغيير كلمة المرور"
    },
    userAccountsManagement: {
        title: "إدارة حسابات المستخدمين"
    },
    warehousesManagement: {
        title: "إدارة المستودعات"
    },
    notFound: {
        title: "هناك شيء غير صحيح...",
        description: "الصفحة التي تحاول فتحها غير موجودة. ربما أخطأت في كتابة العنوان، أو ربما تم نقل الصفحة إلى عنوان آخر. إذا كنت تعتقد أن هذا خطأ اتصل بالدعم.",
        back: "العودة إلى الصفحة الرئيسية"
    }
} as const;

export default root