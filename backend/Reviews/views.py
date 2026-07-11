import logging
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.db import IntegrityError
from django.db import DatabaseError
from Reviews.models import Review
from .serializers import ReviewSerializer
from utils.permission import IsClientUser,IsAdminUser

from drf_yasg.utils import swagger_auto_schema

logger = logging.getLogger(__name__)




class CreateReviewView(APIView):
    permission_classes=[IsClientUser]
    @swagger_auto_schema(request_body=ReviewSerializer)
    def post(self, request, *args, **kwargs):
        try:
            serializer=ReviewSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(client=request.user)

                return Response(
                    {"message": "تم إضافة تقييمك بنجاح، شكراً لك!"}, 
                    status=status.HTTP_201_CREATED
                )

        except IntegrityError:
            return Response(
                {"error": "لقد قمت بتقييم هذه الخدمة مسبقاً، لا يمكنك إضافه تقييم آخر لنفس الخدمة."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except DatabaseError as e:
            logger.error(f"Database error during review creation: {str(e)}")
            return Response({"error": "حدث خطأ داخلي في السيرفر."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ServiceReviewLisView(APIView):
    permission_classes=[AllowAny]
    @swagger_auto_schema(request_body=ReviewSerializer)
    def get(self,request,service_id,*args,**kwargs):
        try:
            querySet=Review.objects.filter(service_id=service_id).order_by("-create_at")
            serializer=ReviewSerializer(querySet,many=True)
            return Response({"reviews": serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            logger.error(f"Database error during fetching reviews: {str(e)}")
            return Response({"error": "حدث خطأ داخلي أثناء جلب التقييمات."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       

class DeleteReviewView(APIView):
    permission_classes = [IsClientUser]
    @swagger_auto_schema(request_body=ReviewSerializer)
    def delete(self,request,review_id,*args,**kwargs):
        try:
            review=get_object_or_404(Review,review_id=review_id)

            if review.client != request.user:
                return Response(
                    {"error": "غير مصرح لك بحذف هذا التقييم، يمكنك حذف تقييماتك الخاصة فقط."}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            review.delete()
            return Response(
                {"message": "تم حذف التقييم بنجاح."}, 
                status=status.HTTP_204_NO_CONTENT
            )
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during review delete: {str(e)}")
            return Response(
                {"error": "unable to delete review due to an internal error"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class DeleteReviewAdminView(APIView):
    permission_classes = [IsAdminUser]
    @swagger_auto_schema(request_body=ReviewSerializer)
    def delete(self,request,review_id,*args,**kwargs):
        try:
            review=get_object_or_404(Review,review_id=review_id)

           
            review.delete()
            return Response(
                {"message": "تم حذف التقييم بنجاح."}, 
                status=status.HTTP_204_NO_CONTENT
            )
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during review delete: {str(e)}")
            return Response(
                {"error": "unable to delete review due to an internal error"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )