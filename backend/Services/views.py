from rest_framework.exceptions import ValidationError

from django.db import DatabaseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


import logging

from utils.permission import IsAdminUser,IsVendorUser
from .models import Users


from .serializer import (CreateCategorySerializer,CreateServiceSerializer,UpdateServiceSerializer,ServiceSerializer)


logger=logging.getLogger(__name__)


# Create your views here.
def service(request):

    return {"message":"service"}

#------------createCategory-----------#
class CreateCategory(APIView):
    permission_classes=[IsAdminUser]
    def post(self,request):
        try:
            serializer=CreateCategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"category created successfully"},status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during registration: {str(e)}")
            return Response({"error": "An unexpected error occurred while processing the request"}, 
            status=status. HTTP_500_INTERNAL_SERVER_ERROR)
#-------------createService-----------#

class CreateService(APIView):
    permission_classes=[IsVendorUser]

    def post(self,request):
        try:
            serilizer=CreateServiceSerializer(data=request.data)
            if serilizer.is_valid():
                serilizer.save()
                return Response({"message":"category created successfully"},status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during registration: {str(e)}")
            return Response({"error": "An unexpected error occurred while processing the request"}, 
            status=status. HTTP_500_INTERNAL_SERVER_ERROR) 