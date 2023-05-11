from django.urls import path, include
from rest_framework import routers
from .views.car_wash_views import ServiceViewSet
from .views.service_type_views import ServiceTypeViewSet

router = routers.SimpleRouter()

router.register(r'services', ServiceViewSet, basename='services')
router.register(r'services_type', ServiceTypeViewSet, basename='services_type')


urlpatterns = [
    path(
        'api/', include(router.urls),
    )
]
