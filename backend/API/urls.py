
from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static





urlpatterns = [
    
    path('api/v1/admin/', admin.site.urls),
    path("api/v1/accounts",include("Accounts.urls")),
    path("api/v1/profiles",include("Profiles.urls")),
    path("api/v1/services",include("Services.urls")),
    path("api/v1/bookings",include("Bookings.urls")),
    path("api/v1/reviews",include("Reviews.urls")),
    path("api/v1/notifications",include("Notifications.urls")),
    path("api/v1/conversations",include("Conversations.urls")),
    path("api/v1/payments",include("Payments.urls")),
         
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


