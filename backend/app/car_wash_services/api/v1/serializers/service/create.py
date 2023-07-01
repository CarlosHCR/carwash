from rest_framework import serializers
from app.car_wash_services.models.service import Service
from app.car_wash_services.models.license_plate import LicensePlate
from app.car_wash_services.api.v1.serializers.type.default import DefaultTypeSerializer
from app.car_wash_services.api.v1.serializers.license_plate.default import DefaultLicensePlateSerializer


class CreateServiceSerializer(serializers.ModelSerializer):
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
        ret['license_plate'] = DefaultLicensePlateSerializer(
            instance.license_plate).data
        ret['type'] = DefaultTypeSerializer(instance.type).data
        return ret

    class Meta:
        model = Service
        fields = [
            'id',
            'user',
            'plate',
            'type',
            'price',
            'date',
            'description',
        ]
