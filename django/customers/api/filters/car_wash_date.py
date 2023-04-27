from customers.models.car_wash_service import CarWashService
from django_filters import rest_framework as filters


class CarWashFilter(filters.FilterSet):

    date = filters.DateFilter(method='filter_report')

    def filter_report(self, queryset, name, value):

        return queryset.filter(
            service_date__month=value.month,
            service_date__year=value.year
        )

    class Meta:
        model = CarWashService
        fields = [
            'date'
        ]
