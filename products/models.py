from django.db import models


# https://docs.djangoproject.com/en/3.1/ref/models/fields/
class Product(models.Model):
    subjID = models.CharField(max_length=200)
    downloads = models.PositiveIntegerField(default=0)
    SPM_activations = models.CharField(max_length=200)
    FS_activations = models.CharField(max_length=200)
    individual_stats = models.JSONField()
    SPM_SN_file = models.JSONField()
    FS_SN_file = models.JSONField()

