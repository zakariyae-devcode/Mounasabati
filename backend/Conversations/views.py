import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.db.models import Q
from django.db import DatabaseError
from .models import Message
from .serializers import MessageSerializer



logger = logging.getLogger(__name__)
class SendMessageView(APIView):

    permission_classes=[IsAuthenticated]


    def post(self,request):
        try:
            serializer=MessageSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(sender=request.user)

                return Response(
                    {"message": "تم إرسال الرسالة بنجاح.", "data": serializer.data}, 
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during message send: {str(e)}")
            return Response({"error": "unable to send message due to an internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ChatHistoryView(APIView):

    permission_classes=[IsAuthenticated]

    def get(self, request,receiver_id):
        try:
            queryset=Message.objects.filter(Q(sender=request.user,receiver_id=receiver_id)| Q(sender_id=receiver_id,receiver=request.user)).order_by('-created_at')

            Message.objects.filter(sender_id=receiver_id, receiver=request.user, is_read=False).update(is_read=True)

            serializer = MessageSerializer(queryset, many=True)

            return Response({"chat_history": serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            logger.error(f"Database error during fetching chat: {str(e)}")
            return Response({"error": "حدث خطأ داخلي أثناء جلب البيانات."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


