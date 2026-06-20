from django.db import models
from Accounts.models import Users



from django.db import models
class Profiles(models.Model):
    
    user = models.OneToOneField(Users, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True, null=True)  
    city = models.CharField(max_length=255, blank=True, null=True, default="Taourirt")
    country = models.CharField(max_length=255, blank=True, null=True, default="Morocco")
    address = models.CharField(max_length=255, blank=True, null=True, default="Bassatine Taourirt")
    image = models.ImageField(upload_to='profile_pics/',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
