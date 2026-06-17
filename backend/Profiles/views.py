

import logging


from django.db import DatabaseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated




from .serializers import CreateProfileSerializer,UpdateProfileSerializer


logger = logging.getLogger(__name__)


class CreateProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def post(sefl,request):
        try:
            serializer=CreateProfileSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "profile created successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during created: {str(e)}")
            return Response({"error": "حدث خطأ غير متوقع أثناء معالجة الطلب."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdareProfileView(APIView):
    permission_classes=[IsAuthenticated]

    def patch(self,request):
        try:
            serialaizer=UpdateProfileSerializer(request.user,data=request.data,partial=True)
            if serialaizer.is_valid():
                serialaizer.save()
                return Response({"message": "user created successfully"}, status=status.HTTP_200_OK)
            return Response(serialaizer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during user update: {str(e)}")
            return Response({"error": "تعذر تحديث البيانات بسبب خطأ داخلي."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       


   