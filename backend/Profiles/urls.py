# Profiles/urls.py
from django.urls import path
from .views import CreateProfileView, UpdateProfileView

urlpatterns = [
    path('create-profile-view/', CreateProfileView.as_view(), name='create-profile'),
    path('update-profile-view/', UpdateProfileView.as_view(), name='update-profile'),
]