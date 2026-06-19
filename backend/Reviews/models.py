from django.db import models
from Accounts.models import Users
from Services.models import Service
# Create your models here.
class Rewiew(models.Model):
    client=models.ForeignKey(Users,on_delete=models.CASCADE,limit_choices_to={'role':'client'},related_name="reviews")
    service=models.ForeignKey(Service,on_delete=models.CASCADE,related_name="reviews")
    rating=models.IntegerField(choices=[(i,str(i)) for i in range(1,6)])

    commment=models.TextField(null=True,blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
         unique_together=("client","service")
    def __str__(self):
        return f"تقييم {self.rating}/5 من {self.client.username}"
