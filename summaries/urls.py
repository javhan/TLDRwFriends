from rest_framework import routers
from .views import SummaryViewSet, GetSummaryViewSet, SaveSummaryViewSet, RemoveSummaryViewSet

router = routers.DefaultRouter()
router.register('api/summaries', SummaryViewSet, 'summaries')
router.register('api/summaries-save', SaveSummaryViewSet, 'summaries-save')
router.register('api/summaries-remove', RemoveSummaryViewSet, 'summaries-remove')
router.register('api/summaries-shorten', GetSummaryViewSet, 'summaries-shorten')

urlpatterns = router.urls


# from django.urls import path
# from .views import SummaryViewSet

# app_name = 'summaries_api'

# urlpatterns = [
#   path('summaries/<int:pk>/, SummaryViewSet.as_view(), name='summaryget')
#   path('summaries/, SummaryViewSet.as_view(), name='summaryget')
# ]
