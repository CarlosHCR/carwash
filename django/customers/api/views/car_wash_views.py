from django.shortcuts import render
from rest_framework import viewsets, permissions
from customers.models import CarWashService
from ..serializers.car_wash_serializer import CarWashServiceSerializer
from django_filters import rest_framework as filters
from ..filters import CarWashFilter
# Create your views here.


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = CarWashService.objects.all()
    permission_classes = [permissions.AllowAny,]
    serializer_class = CarWashServiceSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CarWashFilter
