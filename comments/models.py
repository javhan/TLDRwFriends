from django.db import models
from users.models import CustomUser

# Create your models here.
class Comment(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at= models.DateTimeField(auto_now_add=True)
    body=models.CharField(max_length=8000)