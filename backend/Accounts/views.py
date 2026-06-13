from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from utils.permission import IsAdminUser
from .models import Users
from django.core.mail import send_mail


from .serializers import (
    UserRegisterSerializer, UserUpdateSerializer, UserSerializer,
    ChangePassword, EmailRest, ForgotPassword, Logout
)

def hello(request):
   return JsonResponse({"message": "hello world"})


class RegisterView(APIView):
   def post(self, request):
      serializer = UserRegisterSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response({"message": "user created successfully"}, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class UserDetailView(APIView):
   permission_classes = [IsAuthenticated]
   
   def get(self, request):
      serializer = UserSerializer(request.user)
      return Response({"DetailUser": serializer.data}, status=status.HTTP_200_OK)
   

class UserUpdateView(APIView):
   permission_classes = [IsAuthenticated]
   
   def patch(self, request):
      # 
      serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
      if serializer.is_valid():
         serializer.save()
         return Response({"message": "user updated successfully"}, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
      

class ChangePasswordView(APIView): 
   permission_classes = [IsAuthenticated]
   
   def put(self, request):
      serializer = ChangePassword(request.user, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response({"message": "password updated successfully"}, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailResetView(APIView):
   permission_classes = []
   
   def post(self, request):
      serializer = EmailRest(data=request.data)
      if serializer.is_valid():
         email = serializer.validated_data['email'] # 👈 إصلاح: validated_data بدلاً من validate_data
         try:
            user = Users.objects.get(email=email)
            reset_link = f"http://localhost:3000/reset-password?user_cin={user.cin}"
            send_mail(
                  subject='إعادة تعيين كلمة المرور - منصة مناسباتي',
                  message=f'مرحباً {user.username}، لإعادة تعيين كلمة المرور الخاصة بك، يرجى الضغط على الرابط التالي: {reset_link}',
                  from_email='no-reply@mounasabati.ma',
                  recipient_list=[email],
                  fail_silently=False,
               )
            return Response({"message": "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني."}, status=status.HTTP_200_OK)
         except Users.DoesNotExist:
            return Response({"error": "هذا البريد الإلكتروني غير مسجل."}, status=status.HTTP_404_NOT_FOUND)
            
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class ForgotPasswordView(APIView):
   
   
   def post(self, request): 
      serializer = ForgotPassword(data=request.data)
      if serializer.is_valid():
         user_cin = request.data.get('user_cin')
         if not user_cin:
                return Response({"error": "معرف المستخدم (user_cin) مطلوب."}, status=status.HTTP_400_BAD_REQUEST)
         try:
            user = Users.objects.get(cin=user_cin)
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({"message": "تمت إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول."}, status=status.HTTP_200_OK)
         except Users.DoesNotExist:
            return Response({"error": "المستخدم غير موجود."}, status=status.HTTP_404_NOT_FOUND)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class LogoutView(APIView):
   permission_classes = [IsAuthenticated]
   
   def post(self, request):
      serializer = Logout(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response({"message": "user logged out successfully"}, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class AdminDeleteUserView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, user_cin):
        try:
            user_to_delete = Users.objects.get(cin=user_cin)
            user_to_delete.delete()
            return Response({"message": "تم حذف المستخدم بواسطة المسؤول بنجاح."}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": "المستخدم غير موجود بالفعل."}, status=status.HTTP_404_NOT_FOUND)