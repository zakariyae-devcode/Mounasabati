from rest_framework import serializers


from .models import Review



class  ReviewSerializer(serializers.ModelSerializer):
    
    client_username=serializers.CharField(source="client.username",read_only=True)
    class Meta:
        model=Review

        fields = ['id', 'client', 'client_username', 'service', 'rating', 'comment', 'created_at']

        read_only_fields = ['id', 'client', 'created_at']



       