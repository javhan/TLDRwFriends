from rest_framework import serializers
from comments.models import Comment
from users.serializers import UserSerializer

# Comment Serializer
class GetCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'

class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'