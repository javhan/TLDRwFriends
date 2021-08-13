from django.db import models
from users.models import CustomUser
from comments.models import Comment
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Summary(models.Model):
    user = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE,
        null=True
        )
    created_at = models.DateTimeField(auto_now_add=True)
    content = ArrayField(
        models.TextField(blank=True, null=True),
        size=5,
        null=True,
        )
    tags = ArrayField(
        models.CharField(max_length=25, null=True),
        size=10,
        null=True,
        )
    comments = models.ForeignKey(
        Comment,
        null=True,
        on_delete=models.CASCADE
        )
    url = models.TextField(blank=True, null=True)