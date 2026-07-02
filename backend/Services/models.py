from django.db import models

from django.utils.text import slugify

from Accounts.models import Users


import uuid

class Category(models.Model):
    name=models.CharField(max_length=255,unique=True)
    slug=models.SlugField(max_length=255,unique=True,allow_unicode=True)
    image=models.ImageField(upload_to='categories/',null=True,blank=True)

    def save(self,*args,**kwargs):
        if not self.slug:
            base_slug=slugify(self.name,allow_unicode=True)
            unique_id=uuid.uuid4().hex[:8]
            self.slug=f"{base_slug}-{unique_id}"
        return super().save(*args,**kwargs)
    

    def __str__(self):
        return self.name

class Service(models.Model):
    vendor = models.ForeignKey(Users, on_delete=models.CASCADE,limit_choices_to={'role': 'vendor'},related_name="services")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="services")
    
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