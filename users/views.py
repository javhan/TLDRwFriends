from django.shortcuts import render

# Create your views here.
from users.models import CustomUser
from rest_framework import viewsets, permissions, response, status
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# CustomUser viewset
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def create(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return response.Response(json, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlacklistTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return response.Response(status=status.HTTP_205_RESET_CONTENT)
            
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

# class BlacklistTokenUpdateView(APIView):
#     permission_classes = [permissions.AllowAny]
#     authentication_classes = ()

#     def post(self, request):
#         try:
#             refresh_token = request.data["refresh_token"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return response.Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return response.Response(status=status.HTTP_400_BAD_REQUEST)

    # def create(self, request, format='json')):
    #     serializer = UserSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     print("SRL data", serializer.data)
    #     headers = self.get_success_headers(serializer.data)
    #     return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
