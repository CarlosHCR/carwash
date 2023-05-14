from django.db import models


class Type(models.Model):
    name = models.TextField(
        max_length=30,
        unique=True,
        default=None,
        blank=True,
        null=True
    )

    def __str__(self) -> str:
        return self.name
