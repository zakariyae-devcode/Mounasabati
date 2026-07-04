from django.urls import path
from .views import CreateCategoryView,UpdateCategoryView,DeleteCategoryView,CategoryAdminView


urlpatterns=[

   
    path("create-category/", CreateCategoryView.as_view(),name="create-category-view"),
    path("update-category/<str:name>",UpdateCategoryView.as_view(),name="update-service-view"),
    path("delete-category/<str:name>",DeleteCategoryView.as_view(),name="delete-service-view"),
    path("category-admin-view/",CategoryAdminView.as_view(),name="category-admin-view")
]