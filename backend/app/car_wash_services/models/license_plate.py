###
# Libs
###
from django.db import models
from django.utils.translation import gettext as _


###
# Model
###


class LicensePlate(models.Model):
    number = models.CharField(
        max_length=7,
        unique=True,
        verbose_name=_('License Plate')
    )
