
from django.shortcuts import get_object_or_404
from django.db import DatabaseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status




import logging

from utils.permission import IsVendorUser,IsAdminUser

from .models import Categorys


from .serailizer import CreateCategorySerializer,UpdateCategorySerializer,CategorySerializer


logger=logging.getLogger(__name__)

# Create your views here.
#------------createCategory-----------#
class CreateCategoryView(APIView):
    permission_classes = [IsAdminUser]
    
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
#----------------updateCategory---------------#

class UpdateCategoryView(APIView):
    permission_classes = [IsVendorUser]

    def patch(self, request, name):
        try:
            service = get_object_or_404(Categorys, name=name)
            
            serializer = UpdateCategorySerializer(service, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "service updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during service update: {str(e)}")
            return Response({"error": "unable to update due to an internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

#--------------deleteCategory-----------------#
class DeleteCategoryView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, name):
        try:
            category = get_object_or_404(Categorys, name=name)
            category.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during category deletion: {str(e)}")
            return Response({"error": "فشلت العملية بسبب قيود حماية قاعدة البيانات."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CategoryAdminView(APIView):
    permission_classes = [IsAdminUser]

    def get(self,request):
        category=Categorys.objects.all().order_by('-create_at')
        serializer=CategorySerializer(category,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


