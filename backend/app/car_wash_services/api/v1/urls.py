"""
API V1: Services Urls
"""
###
# Libraries
###
from django.urls import path, include
from rest_framework import routers
from app.car_wash_services.api.v1.views.license_plate_views import LicensePlateViewSet
from app.car_wash_services.api.v1.views.service_views import ServiceViewSet
from app.car_wash_services.api.v1.views.type_views import TypeViewSet


###
# Routers
###
""" Main router """
router = routers.SimpleRouter()

router.register(
    r'services',
    ServiceViewSet,
    basename='services'
)
router.register(
    r'type',
    TypeViewSet,
    basename='type'
)
router.register(
    r'plates',
    LicensePlateViewSet,
    basename='license_plate'
)

###
# URLs
###
urlpatterns = [
    path('', include(router.urls)),
]
