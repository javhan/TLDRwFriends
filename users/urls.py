from rest_framework import routers
from .views import CustomUserViewSet

router = routers.DefaultRouter()
router.register('api/users', CustomUserViewSet, 'users')

urlpatterns = router.urls