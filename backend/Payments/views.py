import logging
import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db import DatabaseError
from Bookings.models import Booking
from .models import Payment
from .serializers import PaymentSerializer

logger = logging.getLogger(__name__)
class ProcessPaymentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            booking_id = request.data.get('booking')
            payment_method = request.data.get('payment_method')
            booking = get_object_or_404(Booking, id=booking_id, client=request.user)

            if hasattr(booking, 'payment') and booking.payment.status == Payment.PaymentStatus.SUCCESSFUL:
                return Response(
                    {"error": "هذا الحجز مدفوع بالفعل مسبقاً."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                fake_transaction_id = f"PAY-{uuid.uuid4().hex.upper()[:12]}"
                payment, created = Payment.objects.update_or_create(
                booking=booking,
                defaults={
                    'amount': booking.total_price, 
                    'payment_method': payment_method,
                    'status': Payment.PaymentStatus.SUCCESSFUL,
                    'transaction_id': fake_transaction_id
                })
                serializer = PaymentSerializer(payment)
                return Response(
                    {
                        "message": "تمت عملية الدفع بنجاح محاكاتها وتأكيد حجزك.",
                        "payment_details": serializer.data
                    }, 
                    status=status.HTTP_200_OK
                )

        except DatabaseError as e:
            logger.error(f"Database error during payment processing: {str(e)}")
            return Response({"error": "حدث خطأ داخلي أثناء معالجة الدفع."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)