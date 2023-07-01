from django.contrib import admin
from app.car_wash_services.models.license_plate import LicensePlate
from app.car_wash_services.models.service import Service
from app.car_wash_services.models.type import Type


class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'license_plate',
        'type',
        'price',
        'date',
        'description',
    )
    list_display_links = (
        'id',
        'license_plate',
    )
    list_filter = (
        'license_plate__number',
    )
    search_fields = (
        'license_plate__number',
    )


admin.site.register(LicensePlate)
admin.site.register(Type)
admin.site.register(Service, ServiceAdmin)
