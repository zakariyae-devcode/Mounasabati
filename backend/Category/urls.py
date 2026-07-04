from django.urls import path
from .views import CreateCategoryView,UpdateCategoryView,DeleteCategoryView


urlpatterns=[

   
    path("create-category/", CreateCategoryView.as_view(),name="create-category-view"),
    path("update-category/<str:name>",UpdateCategoryView.as_view(),name="update-service-view"),
    path("delete-category/<str:name>",DeleteCategoryView.as_view(),name="delete-service-view"),
]