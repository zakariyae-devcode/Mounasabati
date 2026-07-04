from django.urls import path
from .views import CreateServiceView,UpdateServiceView,DeleteServiceView,ServiceDetailsView,ServiceView,ServiceVendorView,ServiceAdminView

urlpatterns=[

   
    path("create-service/", CreateServiceView.as_view(),name="create-service-view"),
    path("update-service/<slug:category_slug>",UpdateServiceView.as_view(),name="update-service-view"),
    path("delete-service/<slug:category_slug>",DeleteServiceView.as_view(),name="delete-service-view"),
    path("deatils-service/<slug:category_slug>",ServiceDetailsView.as_view(),name="details-service-view"),
    path("service-view/",ServiceView.as_view(),name="service-view"),
    path("service-vendor-view/",ServiceVendorView.as_view(),name="service-vendor-view"),
    path("service-admin-view/",ServiceAdminView.as_view(),name="service-admin-view"),

]