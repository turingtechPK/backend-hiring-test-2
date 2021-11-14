from django.shortcuts import render


from rest_framework import mixins, serializers

from rest_framework import permissions, status, authentication

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import Customer, Account, History

from .serializers import AccountSerializer,  CreditHistorySerializer, CustomerSerializer, DebitHistorySerializer, HistorySerializer, TransferSerializer


class CustomerViewSet(mixins.CreateModelMixin,mixins.ListModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    """
    Details of customers and their accounts
    
    Details of customers and their accounts
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class AccountViewSet(mixins.CreateModelMixin,mixins.ListModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    """
    Details of accounts
    
    Details of accounts
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    
class TransferViewSet(viewsets.ModelViewSet):
    """
    Transfer amounts between accounts by providing ids
    
    Transfer amounts between accounts by providing ids and amount
    """
    queryset = Account.objects.all()
    serializer_class = TransferSerializer
    #permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['post']
    
  
class HistoryViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    """
    Show transactions of all accounts
    
    Show transactions of all accounts
    """
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    http_method_names = ['get']
    

class CreditHistoryViewSet(mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    """
    Show credit history of an account by providing its id
    
    Show credit history of an account by providing its id
    """
    queryset = Account.objects.all()
    serializer_class = CreditHistorySerializer
    http_method_names = ['get']

class DebitHistoryViewSet(mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    """
    Show debit history of an account by providing its id
    
    Show debit history of an account by providing its id
    """
    queryset = Account.objects.all()
    serializer_class = DebitHistorySerializer
    http_method_names = ['get']
