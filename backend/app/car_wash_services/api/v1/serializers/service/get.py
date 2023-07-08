###
# Libraries
###
from rest_framework import serializers
from app.car_wash_services.models.service import Service
from app.car_wash_services.api.v1.serializers.license_plate.default import DefaultLicensePlateSerializer
from app.car_wash_services.api.v1.serializers.type.default import DefaultTypeSerializer

###
# Serializers
###


class GetServiceSerializer(serializers.ModelSerializer):
    license_plate = DefaultLicensePlateSerializer(many=False)
    type = DefaultTypeSerializer(many=False)

    class Meta:
        model = Service
        fields = [
            'id',
            'license_plate',
            'type',
            'price',
            'date',
            'description',
        ]
