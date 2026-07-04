from django.urls import path


from .views import CreateBookingView

urlpatterns=[

   path("create-booking-view",CreateBookingView.as_view(),name="create-booking-view")
]