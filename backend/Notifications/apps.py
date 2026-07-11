from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Notifications' # أو المسار الكامل للتطبيق حسب مشروعك

    def ready(self):
        # استدعاء ملف الـ signals عند جاهزية التطبيق ليتم تفعيل المراقبة
        import Notifications.signals