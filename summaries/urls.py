from rest_framework import routers
from .views import SummaryViewSet

router = routers.DefaultRouter()
router.register('api/summaries', SummaryViewSet, 'summaries')

urlpatterns = router.urls


# from django.urls import path
# from .views import SummaryViewSet

# app_name = 'summaries_api'

# urlpatterns = [
#   path('summaries/<int:pk>/, SummaryViewSet.as_view(), name='summaryget')
#   path('summaries/, SummaryViewSet.as_view(), name='summaryget')
# ]
