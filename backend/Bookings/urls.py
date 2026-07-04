from django.urls import path


from .views import CreateBookingView,UpdateBookingView,DeleteBookingView,BookingAdminView,BookingVendorView,BookingUpdateSatus,BookingClientView

urlpatterns=[

   path("create-booking-view",CreateBookingView.as_view(),name="create-booking-view"),
   path("update-booking-view/<int:id>",UpdateBookingView.as_view(),name="update-booking-view"),
   path("delete-booking-view/<int:id>",DeleteBookingView.as_view(),name="delete-booking-view"),
   path("booking-client-view/<int:id>",BookingClientView.as_view(),name="booking-client-view"),
   path("booking-vendor-view/<int:id>",BookingVendorView.as_view(),name="booking-vendor-view"),
   path("booking-updateStatus-view/<int:id>",BookingUpdateSatus.as_view(),name="booking-updateStatus-view"),
   path("booking-admin-view/<int:id>",BookingAdminView.as_view(),name="booking-admin-view"),
   
]