
from django.contrib import admin
from django.urls import path,include
from rest_framework import permissions
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="منصة الحجوزات والخدمات API",
      default_version='v1',
      description="توثيق كامل وشامل لجميع روابط النظام (الحجوزات، المدفوعات، التقييمات، المحادثات)",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="support@myproject.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True, # جعلها عامة ليراها مطورو الفرونت إند
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    
    path('api/v1/admin/', admin.site.urls),
    path("api/v1/accounts",include("Accounts.urls")),
    path("api/v1/profiles",include("Profiles.urls")),
    path("api/v1/services",include("Services.urls")),
    path("api/v1/category",include("Category.urls")),
    path("api/v1/bookings",include("Bookings.urls")),
    path("api/v1/reviews",include("Reviews.urls")),
    path("api/v1/notifications",include("Notifications.urls")),
    path("api/v1/conversations",include("Conversations.urls")),
    path("api/v1/payments",include("Payments.urls")),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
         
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


