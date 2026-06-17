from rest_framework import serializers
from .models import Profiles


class CreateProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username', read_only=True)
    

    class Meta:
        model=Profiles
        fields=["phone","city","country","address"]

        extra_kwargs={
            "phone":{"required":False,"allow_blank":False},
            "city":{"required":False,"allow_blank":False},
            "country":{"required":False,"allow_blank":False},
            "address":{"required":False,"allow_blank":False},
        }

        def create(self,validate_data):

            user=self.context.get('request').user if 'request' in self.context else None
            profile=Profiles.objects.create(user=user,**validate_data)

            return profile
        
class UpdateProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    

    class Meta:
        model=Profiles
        fields=["phone","city","country","address"]

    def update(self, instance, validated_data):
       
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance