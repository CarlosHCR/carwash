from customers.models import Type
from rest_framework import viewsets, permissions

from ..serializers.type_serializer import TypeSerializer


class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    permission_classes = [permissions.AllowAny,]
    serializer_class = TypeSerializer
