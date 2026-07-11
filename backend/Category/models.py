from django.db import models

import uuid
from django.utils.text import slugify

class Categorys(models.Model):
    name=models.CharField(max_length=255,unique=True)
    slug=models.SlugField(max_length=255,unique=True,allow_unicode=True ,blank=True)
    image=models.ImageField(upload_to='categories/',null=True,blank=True)
    def save(self, *args, **kwargs):
        if not self.slug:
            # 1. تحويل الاسم إلى slug مع دعم كامل للغة العربية والانجليزية
            base_slug = slugify(self.name, allow_unicode=True)
            
            # 2. حماية أمنية: إذا كان الاسم يحتوي على رموز فقط وأصبح الـ base_slug فارغاً، نضع اسم افتراضي
            if not base_slug:
                base_slug = "service" # أو اسم المودل الخاص بك مثل category

            # 3. توليد المعرف الفريد القصير
            unique_id = uuid.uuid4().hex[:8]
            
            # 4. دمج الـ slug النهائي
            self.slug = f"{base_slug}-{unique_id}"
            
        # 5. حفظ البيانات الفعلي في قاعدة البيانات (تأكد من استخدام super الصحيحة)
        super().save(*args, **kwargs)
    

    def __str__(self):
        return self.name