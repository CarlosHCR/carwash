"""
Services URL Configuration
"""
###
# Libraries
###
from django.urls import path, include

###
# URL Patterns
###


urlpatterns = [
    path('api/v1/', include('app.car_wash_services.api.v1.urls'))
]
