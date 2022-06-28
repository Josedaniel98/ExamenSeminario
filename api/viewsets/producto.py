''' Producto ViewSet '''

from rest_framework import viewsets
from rest_framework.decorators import action

# Models
from api.models import Precio

# Serializers
from api.serializers import ProductoSerializer, ProductoReadSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Precio.objects.all()
    filter_fields = ( 'id' )
    # serializer_class = ProductoSerializer

    def get_serializer_class(self):

        if self.action == 'list':
            return ProductoReadSerializer
        elif self.action=='retrieve':
            return ProductoSerializer
        
        return ProductoSerializer
    