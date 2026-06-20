from django.db import models

from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

# Create your models here.


class UsersManager(BaseUserManager):
    def create_user(self, username,email,password=None, **extra_fields):
        if not email:
            raise ValueError("يجب ادخال البريد الاكتروني")
        email=self.normalize_email(email)
        extra_fields.setdefault("role","client")
        user=self.model(username=username,email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'superadmin')
        return self.create_user(username, email, password, **extra_fields)
    
class Users(AbstractUser):
    cin_validators=RegexValidator(
        regex=r'^[A-Z]{1,2}[0-9]{6,7}$'
    )
    class UserRole(models.TextChoices):
        CLIENT="client","Client"
        VENDOR="vendor","Vendor"
        ADMIN="admin","Admin"
        SUPREADMIN="superadmin","SuperAdmin"

    role=models.CharField(max_length=50,choices=UserRole.choices,default=UserRole.CLIENT)
    cin=models.CharField(max_length=50,unique=True,validators=[cin_validators],verbose_name="CIN")
    

    deletion_requested_at = models.DateTimeField(null=True, blank=True)



    create_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)


    objects = UsersManager()

   
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'cin']

    class Meta:
        verbose_name = "مستخدم"
        verbose_name_plural = "المستخدمين"

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


   

