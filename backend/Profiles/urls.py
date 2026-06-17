# Profiles/urls.py
from django.urls import path
from .views import CreateProfileView, UpdateProfileView

urlpatterns = [
    path('create/', CreateProfileView.as_view(), name='create-profile'),
    path('update/', UpdateProfileView.as_view(), name='update-profile'),
]