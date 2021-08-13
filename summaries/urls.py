from rest_framework import routers
from .views import SummaryViewSet

router = routers.DefaultRouter()
router.register('api/summaries', SummaryViewSet, 'summaries')

urlpatterns = router.urls