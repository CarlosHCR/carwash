from customers.models import LicensePlate
from rest_framework import viewsets, permissions

from ..serializers.license_plate import LicensePlateSerializer


class LicensePlateViewSet(viewsets.ModelViewSet):
    queryset = LicensePlate.objects.all()
    permission_classes = [permissions.AllowAny,]
    serializer_class = LicensePlateSerializer
