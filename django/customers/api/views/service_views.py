from rest_framework import viewsets, permissions
from customers.models import Service
from ..serializers.service_serializer import ServiceSerializer
from django_filters import rest_framework as filters
from ..filters import ServiceFilter


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    permission_classes = [permissions.AllowAny,]
    serializer_class = ServiceSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ServiceFilter
