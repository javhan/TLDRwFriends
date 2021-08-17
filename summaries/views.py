from summaries.models import Summary
from rest_framework import serializers, viewsets, permissions, status, mixins
from rest_framework.response import Response
from .serializers import SummarySerializer
from .scraper import scraper
from django.shortcuts import get_object_or_404


class GetSummaryViewSet(mixins.CreateModelMixin,viewsets.GenericViewSet):
    """ 
    This view allows anyone (including public) to create a summary via CREATE. 
    No other methods allowed. 
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = SummarySerializer
    queryset = Summary.objects.filter(user_id=None)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print("CHECKKING", scraper(serializer.validated_data['url']))
        if scraper(serializer.validated_data['url']) == "failed":
            return Response(status=status.HTTP_512_NETWORK_URL_INVALID)
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


class SaveSummaryViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    """  
    This view allows logged in users to save his/her summary via UPDATE (summary table's user_id column). 
    No other methods allowed.  
    """
    #summaries-remove/user_id
    queryset = Summary.objects.filter(user_id=None)
    serializer_class = SummarySerializer
    permission_classes = [permissions.IsAuthenticated]
    

class RemoveSummaryViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    """ 
    This view allows logged in users to remove a summary from their vault (sets user_id to None from summary object). 
    No other methods allowed.
    """
    queryset = Summary.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SummarySerializer


class SummaryViewSet(viewsets.ModelViewSet):
    """ 
    This view allows logged in users to view their personal summaries. 
    Allows for all CRUD methods. 
    """
    serializer_class = SummarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args):
        user = self.request.user
        print(self.request.user.last_name)
        print("WHAT USER DOES", user)
        queryset = Summary.objects.filter(user_id=user)
        serializer = SummarySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = self.request.user
        queryset = Summary.objects.filter(user_id=user)
        filtering = get_object_or_404(queryset, pk=pk)
        serializer = SummarySerializer(filtering)
        print("serializer",serializer)
        return Response(serializer.data)
