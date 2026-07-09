from django.db import models
from Accounts.models import Users
from Services.models import Service
# Create your models here.
from django.db import models
# افترضنا أن Users و Service مستوردة لديك بالفعل

class Review(models.Model): # 👈 تصحيح الإملاء (Review)
    client = models.ForeignKey(Users, on_delete=models.CASCADE, limit_choices_to={'role': 'client'}, related_name="reviews")
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="reviews")
    
    # التقييم من 1 إلى 5 نجوم
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)], verbose_name="التقييم")
    comment = models.TextField(null=True, blank=True, verbose_name="التعليق") # 👈 تصحيح الإملاء (comment)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "تقييم"
        verbose_name_plural = "التقييمات"
        # حماية النظام: الزبون يقيم الخدمة مرة واحدة فقط
        unique_together = ("client", "service")

    def __str__(self):
        return f"تقييم {self.rating}/5 من {self.client.username} على {self.service.title}"