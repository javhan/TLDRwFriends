from django.db import models
from django.db.models.fields import TextField
from users.models import CustomUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Summary(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = ArrayField(
        models.CharField(max_length=TextField),
        size=5,
    )
    created_at = models.DateField()
