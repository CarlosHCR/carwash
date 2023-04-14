from django.urls import path, include
from rest_framework import routers
from .views.car_wash_views import ServiceViewSet

router = routers.SimpleRouter()

router.register(r'services', ServiceViewSet, basename='services')


urlpatterns = [
    path(
        'api/', include(router.urls),
    )
]
