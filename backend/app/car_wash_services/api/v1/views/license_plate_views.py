###
# Libs
###
from app.car_wash_services.models.license_plate import LicensePlate
from rest_framework import viewsets, permissions
from app.car_wash_services.api.v1.serializers.license_plate.default import DefaultLicensePlateSerializer

###
# Viewsets
###


class LicensePlateViewSet(viewsets.ModelViewSet):
    queryset = LicensePlate.objects.all()
    serializer_class = DefaultLicensePlateSerializer
    # permission_classes = (permissions.IsAuthenticated,)
