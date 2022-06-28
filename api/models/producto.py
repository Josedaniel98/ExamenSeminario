from django.db import models
from .proveedor import Proveedor


class Producto(models.Model):
    """Modelo de productos """

    nombre = models.CharField(max_length=255)


