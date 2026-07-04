from django.urls import path
from .views import CreateCategoryView,CreateServiceView,UpdateServiceView,DeleteServiceView,ServiceDetailsView,ServiceView

urlpatterns=[

    path("create-category/",CreateCategoryView.as_view(),name="create-category-view"),
    path("create-service/", CreateServiceView.as_view(),name="create-service-view"),
    path("update-service/<slug:category_slug>",UpdateServiceView.as_view(),name="update-service-view"),
    path("delete-service/<slug:category_slug>",DeleteServiceView.as_view(),name="delete-service-view"),
    path("deatils-service/<slug:category_slug>",ServiceDetailsView.as_view(),name="details-service-view"),
    path("service-view/",ServiceView.as_view(),name="service-view")

]