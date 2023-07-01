###
# Libs
###
import uuid
from django.db import models
from django.utils.translation import gettext as _
from app.accounts.models.accounts import User


###
# Model
###


class ChangeEmailRequest(models.Model):
    # Helpers
    uuid = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        verbose_name=_('uuid'),
    )

    # User model
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='change_email_request',
        verbose_name=_('user'),
    )

    # Email
    email = models.EmailField(verbose_name=_('email'))
