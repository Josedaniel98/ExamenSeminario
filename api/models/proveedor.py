from django.db import models

class Proveedor(models.Model):
    """Modelo de proveedores """

    nombre = models.CharField(max_length=255)

