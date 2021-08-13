from django.shortcuts import render

# Create your views here.
from users.models import CustomUser
from rest_framework import viewsets, permissions
from .serializers import UserSerializer

# CustomUser viewset
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
