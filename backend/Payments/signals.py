from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Payment
from Bookings.models import Booking

@receiver(post_save, sender=Payment)
def update_booking_status_on_payment(sender, instance, created, **kwargs):
   
    if instance.status == Payment.PaymentStatus.SUCCESSFUL:
        booking = instance.booking
        booking.status = Booking.BookingStatus.CONFIRMED 
        booking.save(update_fields=['status'])