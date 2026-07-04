import django_filters
from .models import Service

class ServiceFilter(django_filters.FilterSet):
    # فلترة بالمدينة (تطابق تام وبدون حساسية لحالة الأحرف)
    city = django_filters.CharFilter(field_name='city', lookup_expr='iexact')

    #فلتر بعنوان الخدمة 
    title=django_filters.CharFilter(field_name="title",lookup_expr='iexact')
    
    # فلترة بالسعر (أقل من أو يساوي)
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    
    # فلترة بالسعر (أكبر من أو يساوي)
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    
    # الفلترة السحرية عبر الـ slug الموجود في مودل Category المرتبط بالخدمة
    category = django_filters.CharFilter(field_name='category__name', lookup_expr='exact')

    class Meta:
        model = Service
        # الحقول الأساسية التي يمكن الفلترة بها مباشرة
        fields = ['city', 'category','title',"max_price","min_price"]