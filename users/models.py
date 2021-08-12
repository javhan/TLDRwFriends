from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class CustomUser(AbstractUser):
    summaries = ArrayField(models.CharField(max_length=10, blank=True),
    size=10,
    null=True
    )