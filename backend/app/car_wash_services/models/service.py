###
# Libs
###
from django.db import models
from app.car_wash_services.models.license_plate import LicensePlate
from app.car_wash_services.models.type import Type
from django.utils.translation import gettext as _
from app.accounts.models.accounts import User


###
# Model
###


class Service(models.Model):
    user = models.ForeignKey(
        User,
        default=None,
        on_delete=models.SET_DEFAULT,
        verbose_name=_('User')
    )
    license_plate = models.ForeignKey(
        LicensePlate,
        default=None,
        on_delete=models.SET_DEFAULT,
        verbose_name=_('License Plate'),
    )
    type = models.ForeignKey(
        Type,
        default=None,
        on_delete=models.SET_DEFAULT,
        verbose_name=_('Type'),
    )
    price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        verbose_name=_('Price'),
    )
    date = models.DateField(
        verbose_name=_('Date'),
    )
    description = models.TextField(
        max_length=30,
        null=True,
        blank=True,
        verbose_name=_('Description'),
    )
