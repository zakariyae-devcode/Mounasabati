
from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static





urlpatterns = [
    path('api/v1/admin/', admin.site.urls),
    path("api/v1/accounts",include("Accounts.urls")),
    path("api/v1/profiles",include("Profiles.urls")),
         
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


