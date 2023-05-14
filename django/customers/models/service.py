from django.db import models
from .license_plate import LicensePlate
from .type import Type


class Service(models.Model):
    license_plate = models.ForeignKey(
        LicensePlate,
        on_delete=models.CASCADE
    )

    type = models.ForeignKey(
        Type,
        on_delete=models.CASCADE,
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
