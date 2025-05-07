from rest_framework import serializers
from .models import TypesOfPackaging, Services, DeliveryStatus, Delivery


class TypesOfPackagingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypesOfPackaging
        fields = "__all__"


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = "__all__"


class DeliveryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryStatus
        fields = "__all__"


class DeliverySerializer(serializers.ModelSerializer):
    types_of_packaging = TypesOfPackagingSerializer(read_only=True)
    services = ServicesSerializer(read_only=True)
    delivery_status = DeliveryStatusSerializer(read_only=True)

    class Meta:
        model = Delivery
        fields = [
            'title', 'transport_models', 'types_of_packaging', 'services', 'delivery_status', 'types_of_cargo',
            'distance', 'date_delivery'
        ]
