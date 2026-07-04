from django.db import models



from Accounts.models import Users


from Category.models import Categorys

class Service(models.Model):
    vendor = models.ForeignKey(Users, on_delete=models.CASCADE,limit_choices_to={'role': 'vendor'},related_name="services")
    category = models.ForeignKey(Categorys, on_delete=models.PROTECT, related_name="services")
    
    title = models.CharField(max_length=200, verbose_name="عنوان الخدمة")
    description = models.TextField(verbose_name="وصف تفصيلي للخدمة",blank=True,null=True)
    price = models.DecimalField(max_length=10, decimal_places=2, max_digits=10, verbose_name="السعر الافتراضي (درهم)")
    city = models.CharField(max_length=50, verbose_name="المدينة")
    address = models.CharField(max_length=255, verbose_name="العنوان المباشر")
    
    is_available = models.BooleanField(default=True, verbose_name="متاحة للحجز")

    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title