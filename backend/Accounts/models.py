from django.db import models

from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

# Create your models here.

class Users(AbstractUser):
    cin_validators=RegexValidator(
        regex=r'^[A-Z]{1,2}[0-9]{6,7}$'
    )
    class UserRole(models.TextChoices):
        CLIENT="client","Client"
        VENDOR="vendor","Vendor"
        ADMIN="admin","Admin"
    role=models.CharField(max_length=50,choices=UserRole.choices,default=UserRole.CLIENT)
    cin=models.CharField(max_length=50,unique=True,validators=[cin_validators],verbose_name="رقم البطاقة الوطنية")
    image = models.ImageField(upload_to='profile_pics/',null=True,blank=True)

    deletion_requested_at = models.DateTimeField(null=True, blank=True)

    create_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)



    def __str__(self):
        return self.username


