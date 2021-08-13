from rest_framework import routers
from .views import CommentViewSet

router = routers.DefaultRouter()
router.register('api/comments', CommentViewSet, 'comments')

urlpatterns = router.urls