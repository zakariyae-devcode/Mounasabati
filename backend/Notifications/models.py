from django.db import models
from Accounts.models import Users
class Notification(models.Model):
    class NotificationType(models.TextChoices):
        BOOKING_NEW = 'booking_new', 'حجز جديد قادم'
        BOOKING_UPDATE = 'booking_update', 'تحديث على حالة الحجز'
        MESSAGE_NEW = 'message_new', 'رسالة جديدة'
        SYSTEM_ALERT = 'system_alert', 'تنبيه من الإدارة'

    # المستخدم المستهدف بالتنبيه (الذي ستظهر في حسابه الرسالة)
    user = models.ForeignKey(
        Users, 
        on_delete=models.CASCADE, 
        related_name="notifications",
        verbose_name="المستلم"
    )
    
    # عنوان التنبيه ونص التفاصيل
    title = models.CharField(max_length=150, verbose_name="عنوان التنبيه")
    description = models.TextField(verbose_name="نص التنبيه التفصيلي",blank=True,null=True)
    
    # نوع التنبيه لتسهيل فرز الأيقونات والألوان في الواجهة الأمامية (Frontend)
    notification_type = models.CharField(
        max_length=20, 
        choices=NotificationType.choices, 
        default=NotificationType.SYSTEM_ALERT,
        verbose_name="نوع التنبيه"
    )
    
    # حقل لمعرفة هل قرأ المستخدم التنبيه أم لا (لإظهار النقطة الحمراء أو عدد التنبيهات غير المقروءة)
    is_read = models.BooleanField(default=False, verbose_name="تمت القراءة")
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ التنبيه")

    class Meta:
        verbose_name = "تنبيه"
        verbose_name_plural = "التنبيهات"
        ordering = ['-created_at'] # عرض التنبيهات الأحدث أولاً دائماً

    def __str__(self):
        return f"{self.user.username} - {self.title}"