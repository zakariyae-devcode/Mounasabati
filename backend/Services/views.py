
from django.shortcuts import get_object_or_404
from django.db import DatabaseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from Category.models import Categorys

from .filters import ServiceFilter

import logging

from utils.permission import IsAdminUser,IsClientUser,IsVendorUser
from .models import Service


from .serializer import (CreateServiceSerializer,UpdateServiceSerializer,ServiceSerializer)


logger=logging.getLogger(__name__)


# Create your views here.


#-------------createService-----------#

class CreateServiceView(APIView):
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

class UpdateServiceView(APIView):
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
class DeleteServiceView(APIView):
    permission_classes=[IsVendorUser]

    def delete(self, request, category_slug):
        try:
            service = get_object_or_404(Service, category__slug=category_slug, vendor=request.user)
            service.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during service deletion: {str(e)}")
            return Response({"error": "فشلت العملية بسبب قيود حماية قاعدة البيانات."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ServiceView(APIView):
   
    
    def get(self, request):
        try:
            # 1. جلب الخدمات الأساسية
            queryset = Service.objects.all()
            
            # 2. تشغيل كلاس الفلترة الخاص بك يدوياً وتمرير البيانات له
            filter_backend = ServiceFilter(request.GET, queryset=queryset)
            
            # 3. التأكد من أن الفلترة صحيحة وجلب البيانات المفلترة
            if filter_backend.is_valid():
                queryset = filter_backend.qs
            else:
                return Response(filter_backend.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # 4. تطبيق الـ .only() لتحسين الأداء كما طلبت (أضفنا category للاستعلام ليعمل فلتر القسم بدون مشاكل)
            services = queryset.only("title", "price", "city", "address", "category")
            
            # 5. السيريلايزر وإرجاع النتيجة
            serializer = ServiceSerializer(services, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"[SECURITY] Fetch services list failed: {str(e)}")
            return Response(
                {"error": "تعذر جلب البيانات المطلوبة حالياً."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
         
class ServiceDetailsView(APIView):
    # حماية الـ View ليكون للزبائن فقط
    permission_classes = [IsClientUser]

    def get(self, request, category_slug):
        try:
            # 1. التأكد أولاً من أن القسم (Category) موجود وصحيح في قاعدة البيانات
            category = get_object_or_404(Categorys, slug=category_slug)
            
            # 2. جلب جميع الخدمات التي تنتمي لهذا القسم (متاحة لكل التجار ليراها الزبون)
            queryset = Service.objects.filter(category=category)
            
            # 3. تمرير القائمة للسيريالايزر وتحويلها إلى JSON مع تفعيل many=True
            serializer = ServiceSerializer(queryset, many=True)
            
            return Response(
                {"services": serializer.data}, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            logger.error(f"Error retrieving services for category {category_slug}: {str(e)}")
            return Response(
                {"error": "حدث خطأ داخلي في الخادم."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ServiceVendorView(APIView):
    # إجبار أن يكون المستخدم تاجر مسجل دخوله
    permission_classes = [IsVendorUser]

    # نستقبل الـ category_slug من الرابط (URL)
    def get(self, request, category_slug):
        try:
            # 1. التأكد أولاً من أن القسم المرسل موجود في النظام
            category = get_object_or_404(Categorys, slug=category_slug)
            
            # 2. [أمان ومنطق] جلب الخدمات التي تنتمي لهذا القسم + تخص هذا التاجر الحالي فقط
            queryset = Service.objects.filter(category=category, vendor=request.user)
            
            # 3. تمرير القائمة للسيريالايزر (مع many=True لأنها قد تكون مجموعة خدمات)
            serializer = ServiceSerializer(queryset, many=True)
            
            return Response(
                {"services": serializer.data}, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            logger.error(f"Error retrieving services for category {category_slug}: {str(e)}")
            return Response(
                {"error": "حدث خطأ داخلي في الخادم."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ServiceAdminView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
       
        
        queryset = Service.objects.all().order_by('-created_at')
        
        serializer =ServiceSerializer(queryset, many=True)
        
        
        return Response(serializer.data, status=status.HTTP_200_OK)