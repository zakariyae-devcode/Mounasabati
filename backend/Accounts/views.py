import os
import logging
from django.core.mail import send_mail
from django.conf import settings
from django.db import DatabaseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from utils.permission import IsAdminUser
from .models import Users
from .serializers import (
    UserRegisterSerializer, UserUpdateSerializer, UserSerializer,
    ChangePassword, EmailRest, ForgotPassword, Logout, UpdateRole
)

# إعداد الـ Logger الداخلي لتسجيل الثغرات أو أخطاء النظام بأمان دون إظهارها للمستخدم
logger = logging.getLogger(__name__)

#---------------------------------------------------------#
#-------------------- Authentication ---------------------#
#---------------------------------------------------------#

class RegisterView(APIView):
    """إنشاء حساب مستخدم جديد بأمان"""
    def post(self, request):
        try:
            serializer = UserRegisterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "user created successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during registration: {str(e)}")
            return Response({"error": "حدث خطأ غير متوقع أثناء معالجة الطلب."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserDetailView(APIView):
    """جلب بيانات المستخدم الحالي الآمن"""
    permission_classes = [IsAuthenticated]
   
    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            return Response({"DetailUser": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"[SECURITY] Error retrieving user details: {str(e)}")
            return Response({"error": "حدث خطأ داخلي في الخادم."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserUpdateView(APIView):
    """تحديث بيانات المستخدم الحالي جزئياً بأمان"""
    permission_classes = [IsAuthenticated]
   
    def patch(self, request):
        try:
            serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "user updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Database error during user update: {str(e)}")
            return Response({"error": "تعذر تحديث البيانات بسبب خطأ داخلي."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ChangePasswordView(APIView): 
    """تغيير كلمة المرور للمستخدم المسجل"""
    permission_classes = [IsAuthenticated]
   
    def put(self, request):
        try:
            serializer = ChangePassword(request.user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "password updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"[SECURITY] Error during password change: {str(e)}")
            return Response({"error": "فشلت العملية بسبب خطأ غير متوقع."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EmailResetView(APIView):
    """إرسال رابط استعادة كلمة المرور مع حماية ضد الـ User Enumeration"""
    def post(self, request):
        serializer = EmailRest(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # أمنياً: نرجع دائماً نفس الرد بنجاح العملية حتى لو كان الإيميل غير موجود
            # لمنع المخترقين من جرد وفحص الإيميلات المسجلة في قاعدتك
            generic_success_response = Response(
                {"message": "إذا كان البريد الإلكتروني مسجلاً لدينا، ستتلقى رابطاً لإعادة تعيين كلمة المرور قريباً."}, 
                status=status.HTTP_200_OK
            )
            
            try:
                user = Users.objects.get(email=email)
                frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000')
                reset_link = f"{frontend_url}/reset-password?user_cin={user.cin}"
                
                try:
                    send_mail(
                        subject='إعادة تعيين كلمة المرور - منصة مناسباتي',
                        message=f'مرحباً {user.username}، لإعادة تعيين كلمة المرور الخاصة بك، يرجى الضغط على الرابط التالي: {reset_link}',
                        from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'no-reply@mounasabati.ma'),
                        recipient_list=[email],
                        fail_silently=False,
                    )
                except Exception as mail_err:
                    logger.error(f"[SECURITY] SMTP Mail delivery failed: {str(mail_err)}")
                    # لا نخبر المستخدم بفشل السيرفر للحفاظ على سرية البنية التحتية
                    return generic_success_response

                return generic_success_response
                
            except Users.DoesNotExist:
                # إرجاع نفس الرد الآمن حماية للمنصة
                return generic_success_response
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    """إعادة تعيين كلمة المرور باستخدام الـ CIN بشكل معقم ومحمي"""
    def post(self, request): 
        serializer = ForgotPassword(data=request.data)
        if serializer.is_valid():
            user_cin = serializer.validated_data.get('user_cin')
            if not user_cin:
                return Response({"error": "المعرف الفريد مطلوب."}, status=status.HTTP_400_BAD_REQUEST)
            try:
                user = Users.objects.get(cin=user_cin)
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response({"message": "تمت إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول."}, status=status.HTTP_200_OK)
            except Users.DoesNotExist:
                # رد مبهم لحماية الخصوصية في حال التخمين العشوائي للـ CIN
                return Response({"error": "البيانات الممررة غير مطابقة للنظام."}, status=status.HTTP_400_BAD_REQUEST)
            except DatabaseError as e:
                logger.error(f"[SECURITY] Database error during password reset: {str(e)}")
                return Response({"error": "حدث خطأ داخلي أثناء معالجة الطلب."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """تسجيل الخروج الآمن"""
    permission_classes = [IsAuthenticated]
   
    def post(self, request):
        try:
            serializer = Logout(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "user logged out successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"[SECURITY] Logout failure block: {str(e)}")
            return Response({"error": "فشلت معالجة الطلب."}, status=status.HTTP_400_BAD_REQUEST)

#---------------------------------------------------------#
#----------------------- Admin ---------------------------#
#---------------------------------------------------------#

class UserView(APIView):
    """جلب قائمة المستخدمين (محمي بصلاحيات المسؤول الإداري الصارمة)"""
    permission_classes = [IsAdminUser]

    def get(self, request):
        try:
            users = Users.objects.all().only('id', 'username', 'email', 'cin', 'role')
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"[SECURITY] Admin fetch users list failed: {str(e)}")
            return Response({"error": "تعذر جلب البيانات المطلوبة حالياً."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminDeleteUserView(APIView):
    """حذف مستخدم معين (محمي بصلاحيات المسؤول الإداري الصارمة)"""
    permission_classes = [IsAdminUser]

    def delete(self, request, user_cin):
        try:
            user_to_delete = Users.objects.get(cin=user_cin)
            user_to_delete.delete()
            return Response({"message": "تم حذف المستخدم بواسطة المسؤول بنجاح."}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": "المستهدف غير موجود بالنظام."}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Admin deletion database crash for CIN {user_cin}: {str(e)}")
            return Response({"error": "فشلت العملية بسبب قيود حماية قاعدة البيانات."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminUpdateUserRoleView(APIView):
    """تحديث دور المستخدم (محمي بصلاحيات المسؤول الإداري الصارمة)"""
    permission_classes = [IsAdminUser]

    def patch(self, request, user_cin):
        try:
            user = Users.objects.get(cin=user_cin)
            serializer = UpdateRole(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "تم تحديث دور المستخدم بنجاح."}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Users.DoesNotExist:
            return Response({"error": "المستخدم غير مسجل بالنظام."}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError as e:
            logger.error(f"[SECURITY] Admin update role database crash for CIN {user_cin}: {str(e)}")
            return Response({"error": "حدث خطأ إداري داخلي أثناء التعديل."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)