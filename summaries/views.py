from summaries.models import Summary
from rest_framework import serializers, viewsets, permissions, status
from rest_framework.response import Response
from .serializers import SummarySerializer
from .scraper import scraper
# Create your views here.
class GetSummaryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = SummarySerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        scraped = scraper(serializer.validated_data['url'])
        serializer.validated_data['content'] = scraped['content']
        serializer.validated_data['title'] = scraped['title']
        
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SummaryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SummarySerializer

    def list(self, request):
        user = self.request.user
        print(user)
        queryset = Summary.objects.filter(user_id=user)
        serializer = SummarySerializer(queryset, many=True)
        return Response(serializer.data)

    # def retrieve(self, request, pk=None):
    #     queryset = Summary.objects.all()
    #     user = get_object_or_404(queryset, pk=pk)
    #     serializer = SummarySerializer(user)
    #     return Response(serializer.data)

