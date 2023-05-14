from django.urls import path, include
from rest_framework import routers
from .views.service_views import ServiceViewSet
from .views.type_views import TypeViewSet
from .views.license_plate_views import LicensePlateViewSet

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


urlpatterns = [
    path(
        'api/', include(router.urls),
    )
]
