from django.db import models

from django.utils.text import slugify
# Create your models here.
import uuid

class Categorys(models.Model):
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