from summaries.models import Summary
from rest_framework import serializers, viewsets, permissions, status
from rest_framework.response import Response
from .serializers import SummarySerializer
from .scraper import scraper
from django.shortcuts import get_object_or_404
# Create your views here.
class GetSummaryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = SummarySerializer
    queryset = Summary.objects.filter(user_id=None)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        scraped = scraper(serializer.validated_data['url'])

        if scraped:
            serializer.validated_data['content'] = scraped['content']
            serializer.validated_data['title'] = scraped['title']
            serializer.validated_data['tags'] = scraped['tags']
            
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else: 
            return Response(status=status.HTTP_404_NOT_FOUND)

class SummaryViewSet(viewsets.ModelViewSet):
    queryset = Summary.objects.all()
    serializer_class = SummarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args):
        user = self.request.user
        queryset = Summary.objects.filter(user_id=user)
        print("THIS IS FROM SUMMARY VIEW SET", user)
        serializer = SummarySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = self.request.user
        queryset = Summary.objects.filter(user_id=user)
        filtering = get_object_or_404(queryset, pk=pk)
        serializer = SummarySerializer(filtering)
        print("serializer",serializer)
        return Response(serializer.data)

