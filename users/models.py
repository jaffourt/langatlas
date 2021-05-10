from django.db import models


# Create your models here.
class User(models.Model):
    ipv4 = models.GenericIPAddressField(max_length=200)
    ipv6 = models.GenericIPAddressField(max_length=200)
