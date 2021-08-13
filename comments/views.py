from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.core.serializers import serialize

import json

from .helpers import GetBody
from .models import Comment
# Create your views here.
