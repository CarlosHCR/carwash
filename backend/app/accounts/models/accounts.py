###
# Libs
###
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _


###
# Model
###


class User(AbstractUser):
    # Override user model here
    pass
