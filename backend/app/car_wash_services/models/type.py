###
# Libs
###
from django.db import models
from django.utils.translation import gettext as _

###
# Model
###


class Type(models.Model):
    name = models.TextField(
        max_length=30,
        unique=True,
        verbose_name=_('Type'),
    )
