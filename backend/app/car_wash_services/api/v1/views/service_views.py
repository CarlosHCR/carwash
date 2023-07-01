###
# Libs
###
from rest_framework import viewsets, permissions
from django_filters import rest_framework as filters
from app.car_wash_services.models.service import Service
from app.car_wash_services.api.v1.serializers.service.default import DefaultServiceSerializer
from app.car_wash_services.api.v1.serializers.service.create import CreateServiceSerializer
from app.car_wash_services.api.v1.serializers.service.get import GetServiceSerializer
from app.car_wash_services.api.v1.filters.service.service_filter import ServiceFilter

###
# Viewsets
###


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ServiceFilter
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateServiceSerializer
        if self.action == 'get':
            return GetServiceSerializer
        else:
            return DefaultServiceSerializer
