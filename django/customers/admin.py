from django.contrib import admin
from .models import LicensePlate, CarWashService, ServiceType


class CarWashServiceAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'license_plate',
        'service_type',
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
admin.site.register(ServiceType)
admin.site.register(CarWashService, CarWashServiceAdmin)
