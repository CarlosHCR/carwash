from customers.models.car_wash_service import CarWashService
from django_filters import rest_framework as filters


class CarWashFilter(filters.FilterSet):

    date = filters.DateFilter(method='filter_report')
    year = filters.NumberFilter(field_name='date', lookup_expr='year')
    day = filters.NumberFilter(field_name='date', lookup_expr='day')
    month = filters.NumberFilter(field_name='date', lookup_expr='month')

    def filter_report(self, queryset, name, value):
        return queryset.filter(
            date__month=value.month,
            date__year=value.year,
            date__day=value.day
        )

    class Meta:
        model = CarWashService
        fields = "__all__"
