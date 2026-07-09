from rest_framework import serializers


from .models import Review



class CreateReviewSerializer(serializers.ModelSerializer):
    
    client_username=serializers.CharField(source="client.username",read_only=True)


    class Meta:
        pass