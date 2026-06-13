from django.urls import path
from .views import hello

urlpatterns = [
    path("", hello, name="hello"),  # 👈 تركناها فارغة "" لكي تقرأ مباشرة بدون مشاكل
]