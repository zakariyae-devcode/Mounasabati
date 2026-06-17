from django.urls import path

from .views import CreateProfileView , UpdateProfileView

urlpattrens=[
    path("/create-profile",CreateProfileView.as_view(),name="create-profile"),
    path("/update-profile",UpdateProfileView.as_view(),name="update-profile")
]