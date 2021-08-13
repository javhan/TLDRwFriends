from django.db.models import fields
from rest_framework import serializers
from summaries.models import Summary

class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = '__all__'