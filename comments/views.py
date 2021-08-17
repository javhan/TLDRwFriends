from comments.models import Comment
from users.models import CustomUser
from rest_framework import viewsets, permissions, status, mixins
from .serializers import GetCommentSerializer, PostCommentSerializer
from users.serializers import UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class GetCommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = GetCommentSerializer
    
    # Needs to be passed params instead of body because it is a GET method
    def list(self, request, *args, **kwargs):
        print("data", request.query_params)
        summary_id=request.query_params["summary"]
        queryset = Comment.objects.filter(summary=summary_id)
        serializer = GetCommentSerializer(queryset, many=True)

        return Response(serializer.data)

class PostCommentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostCommentSerializer
    


        