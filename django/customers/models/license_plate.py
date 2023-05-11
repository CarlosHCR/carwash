from django.db import models


class LicensePlate(models.Model):
    number = models.CharField(
        max_length=7,
        unique=True
    )

    def __str__(self) -> str:
        return self.number
