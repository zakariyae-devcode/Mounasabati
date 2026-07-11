from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    # إظهار النص المترجم لحالة الدفع ووسيلة الدفع
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    payment_method_display = serializers.CharField(source='get_payment_method_display', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'booking', 'amount', 'payment_method', 
            'payment_method_display', 'status', 'status_display', 
            'transaction_id', 'created_at'
        ]
        # حقول يحددها السيرفر أو بوابة الدفع ولا يمكن للمستخدم تعديلها يدوياً
        read_only_fields = ['id', 'status', 'transaction_id', 'created_at']