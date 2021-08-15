from rest_framework import routers
from django.urls import path
from .views import CustomUserViewSet, BlacklistTokenView

router = routers.DefaultRouter()
router.register('api/users', CustomUserViewSet, 'users')

urlpatterns = [
    path('api/users/logout/blacklist', BlacklistTokenView.as_view(), name="blacklist")
]

urlpatterns += router.urls

