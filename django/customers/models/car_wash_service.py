from django.db import models
from .license_plate import LicensePlate


class CarWashService(models.Model):
    license_plate = models.ForeignKey(
        LicensePlate,
        on_delete=models.CASCADE
    )
    price = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )
    service_date = models.DateField()
    service_description = models.TextField(max_length=30)
