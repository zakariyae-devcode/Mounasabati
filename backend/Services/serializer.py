from rest_framework import serializers
from .models import Service, Category
from Accounts.models import Users
class CreateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "image"]
        # يجب أن تكون extra_kwargs داخل كلاس Meta وليس خارجه
        extra_kwargs = {
            "name": {"required": True, "allow_blank": True},  # تصحيح الخطأ الإملائي من allow_bank إلى allow_blank
            "image": {"required": False, "allow_null": True}
        }

    def create(self, validated_data):  # تصحيح الاسم من validate_data إلى validated_data
        return Category.objects.create(**validated_data)


class CreateServiceSerializer(serializers.ModelSerializer):

    

    category = serializers.SlugRelatedField(slug_field="name", queryset=Category.objects.all())
    
    vendor = serializers.SlugRelatedField(slug_field="username", queryset=Users.objects.all())

    class Meta:
        model = Service
        # ملء الحقول وتضمين الـ category
        fields = ["category", "title", "description", "price", "city", "address"]

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
    category = CreateCategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = "__all__"  # جلب كل الحقول بما فيها الحقول التلقائية مثل id و created_at