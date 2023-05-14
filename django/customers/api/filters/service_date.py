from django_filters import rest_framework as filters
from customers.models import Service


class ServiceFilter(filters.FilterSet):
    day = filters.NumberFilter(method='filter_day')
    month = filters.NumberFilter(method='filter_month')
    year = filters.NumberFilter(method='filter_year')
    plate_number = filters.CharFilter(method='filter_plate_number')

    def filter_day(self, queryset, name, value):
        return queryset.filter(date__day=value)

    def filter_month(self, queryset, name, value):
        return queryset.filter(date__month=value)

    def filter_year(self, queryset, name, value):
        return queryset.filter(date__year=value)

    def filter_plate_number(self, queryset, name, value):
        return queryset.filter(license_plate__number=value)

    class Meta:
        model = Service
        fields = "__all__"
