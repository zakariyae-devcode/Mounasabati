from rest_framework import serializers
from .models import  Categorys
class CreateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorys
        fields = ["name", "image"]
        # يجب أن تكون extra_kwargs داخل كلاس Meta وليس خارجه
        extra_kwargs = {
            "name": {"required": True, "allow_blank": True},  # تصحيح الخطأ الإملائي من allow_bank إلى allow_blank
            "image": {"required": False, "allow_null": True}
        }

    def create(self, validated_data):  # تصحيح الاسم من validate_data إلى validated_data
        return Categorys.objects.create(**validated_data)

class UpdateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorys
        fields = ["name", "image"]
        # يجب أن تكون extra_kwargs داخل كلاس Meta وليس خارجه
        extra_kwargs = {
            "name": {"required": True, "allow_blank": True},  # تصحيح الخطأ الإملائي من allow_bank إلى allow_blank
            "image": {"required": False, "allow_null": True}
        }
    def update(self, instance, validated_data,attr,value):
        for attr,value in validated_data.items():
            setattr(instance,attr,value)
        return instance
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorys
        fields = '__all__'
        # يجب أن تكون extra_kwargs داخل كلاس Meta وليس خارجه
        
