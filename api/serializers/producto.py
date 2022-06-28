''' Producto Serializer '''
from rest_framework import serializers

# Models
from api.models import Precio

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Precio
        fields='__all__'

class ProductoReadSerializer(serializers.ModelSerializer):
    proveedor = serializers.SerializerMethodField()
    producto = serializers.SerializerMethodField()

    class Meta:
        model=Precio
        fields='__all__'

    def get_proveedor(self, obj):
        return obj.proveedor.nombre

    def get_producto(self, obj):
        return obj.producto.nombre
