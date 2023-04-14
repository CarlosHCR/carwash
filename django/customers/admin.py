from django.contrib import admin
from .models import LicensePlate, CarWashService


class CarWashServiceAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'license_plate',
        'price',
        'service_date',
        'service_description',
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
admin.site.register(CarWashService, CarWashServiceAdmin)
