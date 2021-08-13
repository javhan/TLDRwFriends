from django.db import models
from users.models import CustomUser
from comments.models import Comment
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Summary(models.Model):
    user = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE
        )
    created_at = models.DateField(
        models.DateTimeField(auto_now_add=True)
        )
    content = ArrayField(
        models.TextField(blank=True, null=True),
        size=5,
        )
    tags = ArrayField(
        models.CharField(max_length=25),
        size=10,
        )
    comments = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE
        )
