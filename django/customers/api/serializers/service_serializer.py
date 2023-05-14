from rest_framework import serializers
from customers.models import Service, LicensePlate, Type
from .license_plate import LicensePlateSerializer
from .type_serializer import TypeSerializer


class ServiceSerializer(serializers.ModelSerializer):

    plate = serializers.CharField(write_only=True)

    def validate(self, attrs):
        plate = attrs.pop('plate')
        try:
            license_plate = LicensePlate.objects.get(number=plate)
        except LicensePlate.DoesNotExist:
            license_plate = LicensePlate.objects.create(number=plate)
        attrs['license_plate'] = license_plate
        return super().validate(attrs)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['license_plate'] = LicensePlateSerializer(
            instance.license_plate).data
        ret['type'] = TypeSerializer(instance.type).data
        return ret

    class Meta:
        model = Service
        fields = [
            'id',
            'plate',
            'type',
            'price',
            'date',
            'description',
        ]
