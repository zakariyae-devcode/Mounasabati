from django.db.models.signals import post_save
from django.dispatch import receiver

from Bookings.models import Booking

from Conversations.models import Message

from .models import Notification

@receiver(post_save ,sender=Booking)
def create_booking_notification(sender,created,instance,*args,**kwargs):
    if created:
     
        Notification.objects.create(
            user=instance.service.vendor, 
            title="حجز جديد قادم! 📅",
            description=f"قام الزبون {instance.client.username} بحجز خدمتك ({instance.service.title}) ليوم {instance.event_date}.",
            notification_type=Notification.NotificationType.BOOKING_NEW
        )
    else:
      
        Notification.objects.create(
            user=instance.client, 
            title="تحديث بشأن حجزك 🔔",
            description=f"تم تحديث حالة حجزك لخدمة ({instance.service.title}) إلى: {instance.get_status_display()}.",
            notification_type=Notification.NotificationType.BOOKING_UPDATE
        )

@receiver(post_save,sender=Message)
def create_notification(sender,created,instance,*args,**kwargs):
    if created:
        Notification.objects.create(
            user=instance.receiver,
            title="رسالة جديدة غير مقروءة 💬",
            description=f"أرسل لك {instance.sender.username} رسالة جديدة: {instance.content[:50]}...",
            notification_type=Notification.NotificationType.MESSAGE_NEW
        )