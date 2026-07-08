from rest_framework import serializers
from .models import Booking
from django.utils import timezone

from .models import Booking

from Services.serializer import ServiceSerializer
class CreateBookingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Booking
       
        fields = ['event_date', 'notes']

        extra_kwargs = {
            "event_date": {"required": True},
            "notes":{"required":False,"allow_blank":True}
            
        }

    def validate(self, value):
       
        if value < timezone.now().date():
            raise serializers.ValidationError("لا يمكن الحجز في تاريخ قديم.")
        return value
    
class UpdateBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
       
        fields = ['event_date', 'notes']

        extra_kwargs = {
            "event_date": {"required": False},
            "notes":{"required":False,"allow_blank":True}
            
        }

    def validate(self, attrs):
       
        event_date = attrs.get('event_date')
        
        
        if event_date and event_date < timezone.now().date():
            raise serializers.ValidationError({"event_date": "لا يمكن الحجز في تاريخ قديم."})
            
        return attrs
    
    def update(self,instance,attr,value, validated_data):
        for attr,value in  validated_data.items():
            setattr(instance,attr,value)
        return instance
    
class UpdateBookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model =Booking
        fields=["status"]
        extra_kwargs = {
            "status": {"required": False},
        }

class BookingSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    class Meta:
        model =Booking
        fields='__all__'
