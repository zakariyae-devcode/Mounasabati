from django.db import models

from Accounts.models import Users

class Message(models.Model):
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="received_messages")

    content = models.TextField(verbose_name="نص الرسالة")
    is_read = models.BooleanField(default=False, verbose_name="تمت القراءة")
    created_at = models.DateTimeField(auto_now_add=True)

    update_at=models.DateTimeField(auto_now=True)


    class Meta:
        verbose_name = "رسالة"
        verbose_name_plural = "المحادثات"
        ordering = ['created_at']

    def __str__(self):
        return f"من {self.sender.username} إلى {self.receiver.username}"