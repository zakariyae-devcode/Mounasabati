import logging
from django.db import DatabaseError
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profiles
from .serializers import CreateProfileSerializer, UpdateProfileSerializer

logger = logging.getLogger(__name__)

class CreateProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):  # 👈 تم تصحيح sefl إلى self
        try:
            # التحقق المسبق لمنع إنشاء أكثر من ملف شخصي لنفس المستخدم
            if Profiles.objects.filter(user=request.user).exists():
                return Response(
                    {"error": "Profile already exists for this user."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            serializer = CreateProfileSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Profile created successfully."}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during profile creation: {str(e)}")
            return Response({"error": "حدث خطأ غير متوقع أثناء معالجة الطلب."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateProfileView(APIView):  # 👈 تم تصحيح الاسم الإملائي للـ View
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        try:
            # 👈 جلب الملف الشخصي الخاص بالمستخدم الحالي بدقة، وإذا لم يكن موجوداً يعود بـ 404
            profile = get_object_or_404(Profiles, user=request.user)
            
            serializer = UpdateProfileSerializer(profile, data=request.data, partial=True)  # 👈 تمرير الـ profile هنا وليس الـ user
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)  # 👈 تعديل رسالة النجاح
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during profile update: {str(e)}")
            return Response({"error": "تعذر تحديث البيانات بسبب خطأ داخلي."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)