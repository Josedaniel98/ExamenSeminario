from django.db import models
from .producto import Producto
from .proveedor import Proveedor

class Precio(models.Model):
    """Modelo de precios """

    proveedor = models.ForeignKey(
        Proveedor,
        on_delete=models.deletion.CASCADE,
        related_name="proveedor",
        null=True,
        blank=True
    )

    producto = models.ForeignKey(
        Producto,
        on_delete=models.deletion.CASCADE,
        related_name="producto",
        null=True,
        blank=True
    )

    precio_mayoreo = models.FloatField(default=0)
    precio_unitario = models.FloatField(default=0)
    precio_oferta = models.FloatField(default=0)
    precio_liquidacion = models.FloatField(default=0)