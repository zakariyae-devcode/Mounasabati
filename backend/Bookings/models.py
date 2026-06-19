from django.db import models
from Accounts.models import Users
from Services.models import Service
# Create your models here.
class Booking(models.Model):
    class BookingStauts(models.TextChoices):
        PENDING = 'pending', 'في انتظار الموافقة'
        CONFIRMED = 'confirmed', 'مؤكد'
        CANCELLED = 'cancelled', 'ملغي'
        COMPLETED = 'completed','مكتمل'
    
    client=models.ForeignKey(Users,on_delete=models.CASCADE,limit_choices_to={'role':'client'},related_name="bookings")
    service=models.ForeignKey(Service,on_delete=models.CASCADE,related_name='bookings')
    evant_date=models.DateField(verbose_name="تاريخ المناسبة / الحجز")
    status=models.CharField(max_length=255,choices=BookingStauts.choices, default=BookingStauts.PENDING)
    total_price = models.DecimalField(decimal_places=2, max_digits=10, verbose_name="الإجمالي المتفق عليه")

    notes = models.TextField(null=True, blank=True, verbose_name="ملاحظات إضافية من الزبون")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "حجز"
        verbose_name_plural = "الحجوزات"
        # منع حجز نفس الخدمة في نفس التاريخ لتفادي تضارب المواعيد
        unique_together = ('service', 'event_date')

    def __str__(self):
        return f"{self.service.title} - {self.client.username} ({self.get_status_display()})"

    def __str__(self):
        return self.service.title