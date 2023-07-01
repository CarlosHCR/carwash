###
# Libs
###
from app.car_wash_services.models.type import Type
from rest_framework import viewsets
from app.car_wash_services.api.v1.serializers.type.default import DefaultTypeSerializer

###
# Viewsets
###


class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = DefaultTypeSerializer
