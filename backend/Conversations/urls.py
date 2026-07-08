from django.urls import path
from .views import SendMessageView, ChatHistoryView

urlpatterns = [
    # رابط إرسال الرسالة (الـ POST)
    path('messages/send/', SendMessageView.as_view(), name='send-message'),
    
    # رابط جلب المحادثة مع شخص معين عبر الـ id الخاص به (الـ GET)
    path('messages/chat/<int:receiver_id>/', ChatHistoryView.as_view(), name='chat-history'),
]