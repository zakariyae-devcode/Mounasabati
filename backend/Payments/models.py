from django.db import models
from Bookings.models import Booking

class Payment(models.Model):
    class PaymentStatus(models.TextChoices):
        PENDING = 'pending', 'في انتظار الدفع'
        SUCCESSFUL = 'successful', 'ناجح'
        FAILED = 'failed', 'فاشل'
        REFUNDED = 'refunded', 'مسترجع'

    class PaymentMethod(models.TextChoices):
        PAYPAL = 'paypal', 'باي بال'
        CARD = 'card', 'بطاقة بنكية'
        CASH = 'cash', 'نقداً / عند الحضور'

    # ربط عملية الدفع بحجز واحد محدد
    booking = models.OneToOneField(
        Booking, 
        on_delete=models.CASCADE, 
        related_name='payment', 
        verbose_name="الحجز المرتبط"
    )
    
    # تفاصيل المعاملة المادية
    amount = models.DecimalField(decimal_places=2, max_digits=10, verbose_name="المبلغ المدفوع")
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.CARD, verbose_name="وسيلة الدفع")
    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING, verbose_name="حالة الدفع")
    
    # المعرف الفريد القادم من بوابة الدفع (يُملأ بعد نجاح العملية)
    transaction_id = models.CharField(max_length=255, null=True, blank=True, unique=True, verbose_name="رقم المعاملة")
    
    # التوثيق الزمني
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "عملية دفع"
        verbose_name_plural = "عمليات الدفع"
        ordering = ['-created_at']

    def __str__(self):
        return f"دفع للحجز {self.booking.id} - الحالة: {self.get_status_display()}"