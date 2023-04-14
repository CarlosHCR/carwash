from django.shortcuts import render
from rest_framework import viewsets, permissions
from customers.models import CarWashService
from ..serializers.car_wash_serializer import CarWashServiceSerializer
# Create your views here.


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = CarWashService.objects.all()
    permission_classes = [permissions.AllowAny,]
    serializer_class = CarWashServiceSerializer
