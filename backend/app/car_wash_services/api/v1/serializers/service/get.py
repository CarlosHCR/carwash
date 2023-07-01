###
# Libraries
###
from rest_framework import serializers
from app.car_wash_services.models.service import Service

###
# Serializers
###


class GetServiceSerializer(serializers.ModelSerializer):

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
