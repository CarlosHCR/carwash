###
# Libraries
###
from rest_framework import serializers
from app.car_wash_services.models.type import Type

###
# Serializers
###


class DefaultTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Type
        fields = '__all__'
