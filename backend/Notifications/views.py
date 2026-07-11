import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db import DatabaseError
from .models import Notification
from .serializer import NotificationSerializer

from drf_yasg.utils import swagger_auto_schema
logger = logging.getLogger(__name__)

# Create your views here.
def notification(request):

    return {"message":"notification"}


class UserNotificationListView(APIView):
    permission_classes = [IsAuthenticated]
   
    def get(self, request,*args,**kwargs):

        try:
           queryset = Notification.objects.filter(user=request.user)
           unread_count = queryset.filter(is_read=False).count()

           serializer = NotificationSerializer(queryset, many=True)
           return Response({
                "unread_count": unread_count,
                "notifications": serializer.data
            }, status=status.HTTP_200_OK)
        except DatabaseError as e:
            logger.error(f"Database error during fetching notifications: {str(e)}")
            return Response({"error": "حدث خطأ داخلي أثناء جلب التنبيهات."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class MarkNotificationReadView(APIView):
    permission_classes = [IsAuthenticated]
   
    def patch(self, request, notification_id):
        try:
           notification = get_object_or_404(Notification, id=notification_id, user=request.user)
           notification.is_read = True
           notification.save(update_fields=['is_read'])
           return Response({"message": "تم تعيين التنبيه كمقروء."}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            logger.error(f"Database error during updating notification: {str(e)}")
            return Response({"error": "حدث خطأ داخلي."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)