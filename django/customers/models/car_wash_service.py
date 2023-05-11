from django.db import models
from .license_plate import LicensePlate
from .service_type import ServiceType


class CarWashService(models.Model):
    license_plate = models.ForeignKey(
        LicensePlate,
        on_delete=models.CASCADE
    )

    service_type = models.ForeignKey(
        ServiceType,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    price = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )
    date = models.DateField()
    description = models.TextField(
        max_length=30,
        null=True,
        blank=True
    )
    