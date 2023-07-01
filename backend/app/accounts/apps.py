"""
Accounts Apps
"""
###
# Libraries
###
from django.apps import AppConfig


###
# Config
###
class ServicesConfig(AppConfig):
    name = 'app.accounts'

    def ready(self):
        import app.accounts.signals
