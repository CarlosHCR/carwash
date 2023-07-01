###
# Libraries
###
from rest_framework import serializers
from app.car_wash_services.models.service import Service

###
# Serializers
###


class DefaultServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = '__all__'
