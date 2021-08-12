from django.db import models
from users.models import CustomUser
# from comments.models import Comments
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Summary(models.Model):
    user_id = models.ForeignKey(
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
    # comments = models.ForeignKey(
    #     Comments
    #     on_delete=models.CASCADE
    #     )
