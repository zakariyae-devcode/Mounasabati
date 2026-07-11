from rest_framework import serializers

from .models import Notification



class NotificationSerializer(serializers.ModelSerializer):

    notification_type_display=serializers.CharField(source="get_notification_type_display")


    class Meta:
        model = Notification
        fields = ['id', 'title', 'description', 'notification_type', 'notification_type_display', 'is_read', 'created_at']