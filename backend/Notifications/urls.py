from django.urls import path
from .views import UserNotificationListView, MarkNotificationReadView

urlpatterns = [
    
    path('notifications/', UserNotificationListView.as_view(), name='user-notifications'),
    
    path('notifications/<int:notification_id>/read/', MarkNotificationReadView.as_view(), name='mark-notification-read'),
]