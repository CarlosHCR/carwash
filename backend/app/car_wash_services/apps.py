"""
Services Apps
"""
###
# Libraries
###
from django.apps import AppConfig


###
# Config
###
class CarWashServicesConfig(AppConfig):
    name = 'app.car_wash_services'

    def ready(self):
        import app.car_wash_services.signals
