from rest_framework import serializers
from customers.models import CarWashService, LicensePlate
from .license_plate import LicensePlateSerializer


class CarWashServiceSerializer(serializers.ModelSerializer):

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
        return ret

    class Meta:
        model = CarWashService
        fields = [
            'id',
            'plate',
            'price',
            'service_date',
            'service_description',
        ]
