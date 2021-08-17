from django.db import models
from users.models import CustomUser
from summaries.models import Summary

# Create your models here.
class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at= models.DateTimeField(auto_now_add=True)
    body= models.TextField()
    summary = models.ForeignKey(Summary, on_delete=models.CASCADE)