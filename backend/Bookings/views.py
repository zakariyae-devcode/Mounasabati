import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from Services.models import Service
from .serailzer import CreateBookingSerializer
# Create your views here.

logger = logging.getLogger(__name__)

class CreateBookingView(APIView):
    # إجبار الزبون على أن يكون مسجلاً دخوله
    permission_classes = [IsAuthenticated]

    def post(self, request, service_id):
    
        service = get_object_or_404(Service, id=service_id)
        
    
        serializer = CreateBookingSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
              
                booking = serializer.save(
                    client=request.user,     
                    service=service,           
                    total_price=service.price 
                )
                
                return Response(
                    {
                        "message": "تم تقديم طلب الحجز بنجاح، وهو الآن في انتظار موافقة التاجر.",
                        "booking_id": booking.id
                    },
                    status=status.HTTP_201_CREATED
                )
                
            except IntegrityError:
               
                return Response(
                    {"error": "عذراً، هذه الخدمة محجوزة بالفعل في هذا التاريخ. يرجى اختيار تاريخ آخر."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)