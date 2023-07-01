from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        r'', include('app.car_wash_services.urls')
    ),
    path(
        r'', include('app.accounts.urls')
    )
]
