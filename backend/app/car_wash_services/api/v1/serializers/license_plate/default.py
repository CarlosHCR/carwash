###
# Libraries
###
from rest_framework import serializers
from app.car_wash_services.models.license_plate import LicensePlate

###
# Serializers
###


class DefaultLicensePlateSerializer(serializers.ModelSerializer):

    class Meta:
        model = LicensePlate
        fields = '__all__'
