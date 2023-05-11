from customers.models import ServiceType
from rest_framework import viewsets, permissions

from ..serializers.service_type import ServiceTypeSerializer


class ServiceTypeViewSet(viewsets.ModelViewSet):
    queryset = ServiceType.objects.all()
    permission_classes = [permissions.AllowAny,]
    serializer_class = ServiceTypeSerializer
