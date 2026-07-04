from rest_framework import serializers
from .models import Service
from Category.models import Categorys
from Accounts.models import Users

from Category.serailizer import CategorySerializer
class CreateServiceSerializer(serializers.ModelSerializer):

    

    category = serializers.SlugRelatedField(slug_field="name", queryset=Categorys.objects.all())
    
    vendor = serializers.SlugRelatedField(slug_field="username", queryset=Users.objects.all())

    class Meta:
        model = Service
        # ملء الحقول وتضمين الـ category
        fields = ["category", "title", "description", "price", "city", "address"]

        extra_kwargs = {
            "category": {"required": True,"allow_blank": False},
            "title": {"required":True,"allow_blank": False},
            "description": {"required": True,"allow_blank": False},
            "price": {"required": True,"allow_blank": False},
            "city": {"required": True,"allow_blank": False},
            "address": {"required": True,"allow_blank": False},
        }

    def create(self, validated_data):
        # جلب المستخدم الحالي (البائع) من سياق الطلب
        vendor = self.context["request"].user
        # إنشاء الخدمة وربطها بالبائع وباقي البيانات
        service = Service.objects.create(vendor=vendor, **validated_data)
        return service


class UpdateServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["category", "title", "description", "price", "city", "address"]
        # في التحديث نجعل الحقول اختيارية حتى لا نُجبر المستخدم على إرسال كل البيانات
        extra_kwargs = {
            "category": {"required": False},
            "title": {"required": False},
            "description": {"required": False},
            "price": {"required": False},
            "city": {"required": False},
            "address": {"required": False},
        }


class ServiceSerializer(serializers.ModelSerializer):
    # سيريالايزر مخصص لعرض البيانات بالكامل (Read-Only) شامل تفاصيل التصنيف
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = "__all__"  # جلب كل الحقول بما فيها الحقول التلقائية مثل id و created_at
