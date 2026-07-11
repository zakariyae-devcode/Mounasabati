import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from utils.permission import IsAdminUser,IsClientUser,IsVendorUser
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from Services.models import Service
from .serailzer import CreateBookingSerializer,UpdateBookingSerializer,BookingSerializer
# Create your views here.
from django.db import DatabaseError


from .models import Booking

logger = logging.getLogger(__name__)


from drf_yasg.utils import swagger_auto_schema

class CreateBookingView(APIView):
    # إجبار الزبون على أن يكون مسجلاً دخوله
    permission_classes = [IsClientUser]
    
    
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
    
class UpdateBookingView(APIView):
    permission_classes = [IsClientUser]

    
    def patch(self, request, booking_id):
        try:
           
            booking = get_object_or_404(Booking, id=booking_id)

           
            if booking.client != request.user:
                return Response(
                    {"error": "غير مصرح لك بتعديل هذا الحجز."}, 
                    status=status.HTTP_403_FORBIDDEN
                )

            
            if booking.status != 'pending':
                return Response(
                    {"error": "لا يمكن تعديل الحجز بعد موافقة التاجر عليه أو إلغائه."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

         
            serializer = UpdateBookingSerializer(booking, data=request.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "تم تحديث بيانات الحجز بنجاح."}, 
                    status=status.HTTP_200_OK
                )
                
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during booking update: {str(e)}")
            return Response(
                {"error": "unable to update due to an internal error"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class DeleteBookingView(APIView):
    permission_classes = [IsClientUser]

    def delete(self, request, booking_id):
        try:
            # 1. جلب الحجز بناءً على الـ id الخاص به
            booking = get_object_or_404(Booking, id=booking_id)

            # 2. [حماية أمنية] التحقق من أن الشخص الذي يحاول الحذف هو صاحب الحجز نفسه
            # بدون هذا السطر، يمكن لأي مستخدم مسجل دخول أن يحذف حجوزات الآخرين بمجرد تخمين الـ id!
            if booking.client != request.user:
                return Response(
                    {"error": "غير مصرح لك بحذف هذا الحجز."}, 
                    status=status.HTTP_403_FORBIDDEN
                )

            # 3. [منطق العمل] منع الحذف المفاجئ إذا تم تأكيد الحجز
            # إذا وافق التاجر وبدأ في التجهيز، لا يجوز للزبون حذف الحجز فجأة (إلا عبر طلب إلغاء مثلاً)
            if booking.status != 'pending':
                return Response(
                    {"error": "لا يمكن حذف الحجز بعد موافقة التاجر عليه، يمكنك طلب الإلغاء بدلاً من ذلك."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # 4. الحذف الفعلي من قاعدة البيانات بعد اجتياز الشروط
            booking.delete()
            return Response(
                {"message": "تم حذف الحجز بنجاح."},
                status=status.HTTP_204_NO_CONTENT
            )

        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during booking delete: {str(e)}")
            return Response(
                {"error": "unable to delete due to an internal error"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class BookingClientView(APIView):
    # استخدام كلاس الحماية الخاص بالزبون الذي كتبته أنت
    permission_classes = [IsClientUser]
   
    def get(self, request):
        # جلب الحجوزات الخاصة بهذا الزبون فقط لمنع التجسس على بيانات الآخرين
        queryset = Booking.objects.filter(client=request.user).order_by('-created_at')
        
        # تمرير البيانات للسيريالايزر لتحويلها إلى JSON (مع إضافة many=True لأنها قائمة)
        serializer = BookingSerializer(queryset, many=True)
        
        # إرجاع البيانات للفرونت إند بسلام وأمان
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BookingVendorView(APIView):
    permission_classes = [IsVendorUser]
    
    def get(self, request, booking_id):
       
        
        queryset = Booking.objects.filter(service__vendor=request.user).order_by('-created_at')
        
        serializer = BookingSerializer(queryset, many=True)
        
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class BookingUpdateSatus(APIView):
    permission_classes = [IsVendorUser]
   
    def patch(self,request,booking_id):
        try:
            booking = get_object_or_404(Booking, id=booking_id)

            if booking.service.vendor!=request.user:
                return Response(
                        {"error": "غير مصرح لك بتعديل حالة هذا الحجز، هذه الخدمة لا تتبع لمتجرك."}, 
                        status=status.HTTP_403_FORBIDDEN
                )
            new_status = request.data.get('status')
            if new_status not in [Booking.BookingStatus.CONFIRMED, Booking.BookingStatus.CANCELLED, Booking.BookingStatus.COMPLETED]:
                return Response(
                        {"error": "الحالة المرسلة غير صالحة. يمكنك الاختيار بين (confirmed, cancelled, completed) فقط."}, 
                        status=status.HTTP_400_BAD_REQUEST
                )
            booking.status = new_status
            booking.save(update_fields=['status']) 
            return Response(
                {
                    "message": f"تم تحديث حالة الحجز بنجاح إلى: {booking.get_status_display()}.",
                    "booking_id": booking.id,
                    "status": booking.status
                }, 
                status=status.HTTP_200_OK
            )

        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during vendor status update: {str(e)}")
            return Response(
                {"error": "unable to update status due to an internal error"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class BookingAdminView(APIView):
    permission_classes = [IsAdminUser]
   
    def get(self, request):
       
        
        queryset = Booking.objects.all().order_by('-created_at')
        
        serializer = BookingSerializer(queryset, many=True)
        
        
        return Response(serializer.data, status=status.HTTP_200_OK)