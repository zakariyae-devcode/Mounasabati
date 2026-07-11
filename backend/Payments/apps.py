from django.apps import AppConfig


class PaymentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Payments' # أو المسار الكامل للتطبيق حسب مشروعك

    def ready(self):
        # استدعاء ملف الـ signals عند جاهزية التطبيق ليتم تفعيل المراقبة
        import Payments.signals
