# Generated by Django 3.2.6 on 2021-08-12 13:00

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Summary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(verbose_name=models.DateTimeField(auto_now_add=True))),
                ('content', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), size=5)),
                ('tags', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=25), size=10)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
