from django.shortcuts import render
from summaries.models import Summary
from rest_framework import serializers, viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import SummarySerializer
from .scraper import scraper
# Create your views here.
class SummaryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = SummarySerializer

    # @action( methods=['post'],detail=True)
    # def process_summary(self, request, **kwargs):
    #     user = self.get_object()
    #     print("Test")
    #     return Response("Hi")


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print("DATA", request.data)
        serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)

        print("SRL data", serializer.validated_data['url'])
        serializer.validated_data['content'] = [scraper(serializer.validated_data['url'])]
        
        serializer.save()
        print("SRL data", serializer.data['content'])
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request):
        queryset = Summary.objects.all()
        serializer = SummarySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Summary.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = SummarySerializer(user)
        return Response(serializer.data)
    # def perform_create(self, serializer):
    #     #serializer.content = the spacy output goes here
    #     #scraper(serializer.url)
    #     serializer.save()

    
        # self.serializer_class = SummarySerializer
        # item = self.kwargs.get('pk')
        # print(item)
        # if request.method == 'POST':
        #     print("user")
        # else:
        #     print("cui")
