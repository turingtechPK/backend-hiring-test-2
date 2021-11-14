from django.urls import path, include
from django.contrib import admin
from . import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('customer',views.CustomerViewSet,basename='customer')
router.register('account',views.AccountViewSet,basename='account')
router.register('transfer',views.TransferViewSet,basename='transfer')
router.register('debit_history',views.DebitHistoryViewSet,basename='debit_history')
router.register('credit_history',views.CreditHistoryViewSet,basename='credit_history')
router.register('history',views.HistoryViewSet,basename='history')


urlpatterns = [
    path('', include(router.urls)),
    
]