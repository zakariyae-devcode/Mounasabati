from rest_framework import serializers
from .models import Profiles
from django.db import transaction

class CreateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profiles
        fields=["phone","city","country","address"]

        extra_kwargs={
            "phone":{"required":False,"allow_blank":False},
            "city":{"required":False,"allow_blank":False},
            "country":{"required":False,"allow_blank":False},
            "address":{"required":False,"allow_blank":False},
        }
        
    @transaction.atomic
    def create(self,validated_data):

        user = self.context['request'].user
        with transaction.atomic():
            profile=Profiles.objects.create(user=user,**validated_data)
            return profile
        
class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profiles
        fields=["phone","city","country","address"]

    def update(self, instance, validated_data):
       
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance