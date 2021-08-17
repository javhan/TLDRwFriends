from rest_framework import routers
from .views import GetCommentViewSet, PostCommentViewSet

router = routers.DefaultRouter()
router.register('api/comments', GetCommentViewSet, 'comments')
router.register('api/comments-post', PostCommentViewSet, 'comments-post')

urlpatterns = router.urls