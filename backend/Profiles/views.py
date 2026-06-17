from django.shortcuts import render

from django.conf import settings
from django.db import DatabaseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated




from .serializers import CreateProfileSerializer,UpdateProfileSerializer


logger = logging.getLogger(__name__)


class CreateProfileView(APIView):
    
    def post(sefl,request):
        try:
            serializer=CreateProfileSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "profile created successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            pass
   