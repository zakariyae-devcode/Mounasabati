
from django.shortcuts import get_object_or_404
from django.db import DatabaseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


import logging

from utils.permission import IsVendorUser
from .models import Service


from .serializer import (CreateCategorySerializer,CreateServiceSerializer,UpdateServiceSerializer,ServiceSerializer)


logger=logging.getLogger(__name__)


# Create your views here.


#------------createCategory-----------#
class CreateCategory(APIView):
    permission_classes = [IsVendorUser]
    
    def post(self, request):
        try:
            serializer = CreateCategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "تم إنشاء القسم بنجاح"}, 
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except DatabaseError as e:
            # تم تعديل نص الخطأ ليناسب عملية إنشاء القسم بدلاً من التسجيل
            logger.error(f"[SECURITY] Database error during category creation: {str(e)}")
            # تم إصلاح الفراغ الزائد في استدعاء حالة الخطأ 500
            return Response(
                {"error": "حدث خطأ غير متوقع أثناء معالجة الطلب"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
#-------------createService-----------#

class CreateService(APIView):
    permission_classes = [IsVendorUser]

    def post(self, request):
        try:
            # إصلاح الأخطاء الإملائية في اسم المتغير serializer
            serializer = CreateServiceSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                # تعديل الرسالة لتناسب "الخدمة" بدلاً من "القسم"
                return Response({"message": "service created successfully"}, status=status.HTTP_201_CREATED)
            
            # إضافة رد في حال فشل التحقق (Validation Failed)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except DatabaseError as e:
            # تعديل رسالة السجل لتناسب عملية إنشاء الخدمة
            logger.error(f"[SECURITY] Database error during service creation: {str(e)}")
            # إصلاح الفراغ الزائد في status.HTTP_500_INTERNAL_SERVER_ERROR
            return Response(
                {"error": "An unexpected error occurred while processing the request"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
#-------------updateSerivce--------------#

class UpdateService(APIView):
    permission_classes = [IsVendorUser]

    def patch(self, request, category_slug):
        try:
            service = get_object_or_404(Service, category__slug=category_slug, vendor=request.user)
            
            serializer = UpdateServiceSerializer(service, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "service updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during service update: {str(e)}")
            return Response({"error": "unable to update due to an internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#-------------deleteSerivce-------------#
class DeleteService(APIView):
    permission_classes=[IsVendorUser]

    def delete(self, request, category_slug):
        try:
            service = get_object_or_404(Service, category__slug=category_slug, vendor=request.user)
            service.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during service deletion: {str(e)}")
            return Response({"error": "فشلت العملية بسبب قيود حماية قاعدة البيانات."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class ServiceDetailsView(APIView):
    permission_classes=[IsVendorUser]
    
    def get(self,request,category_slug):
        try:
            service = get_object_or_404(Service, category__slug=category_slug, vendor=request.user)
            
            serializer = ServiceSerializer(service)
            return Response({"ServiceDetails": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error retrieving service for category {category_slug}: {str(e)}")
            return Response({"error": "حدث خطأ داخلي في الخادم."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServiceView(APIView):
    # استخدام الصلاحية التي حددتها (يجب أن يكون مسجلاً دخوله)
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            # 1. جلب الخدمات مع تحديد الحقول المطلوبة فقط لتحسين الأداء
            services = Service.objects.all().only("title", "price", "city", "address")
            
            # 2. تحويل البيانات إلى JSON باستخدام السيريلايزر (وضع many=True لأنها قائمة)
            serializer = ServiceSerializer(services, many=True)
            
            # 3. إرجاع البيانات بنجاح
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            # تصحيح نص السجل ليعبر عن سياق جلب الخدمات وليس المستخدمين
            logger.error(f"[SECURITY] Fetch services list failed: {str(e)}")
            return Response(
                {"error": "تعذر جلب البيانات المطلوبة حالياً."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )