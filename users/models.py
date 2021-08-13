from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)