from django.db import models


class LicensePlate(models.Model):
    number = models.CharField(
        max_length=10,
        unique=True
    )

    def __str__(self) -> str:
        return self.number
