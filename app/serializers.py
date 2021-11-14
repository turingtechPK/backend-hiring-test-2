from rest_framework import serializers
from .models import Customer, Account, History
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'accounts']
        read_only_fields = ['accounts']

    
      
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'customer', 'deposit']

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['id', 'from_account', 'to_account', 'money', 'datetime']

        
class TransferSerializer(serializers.ModelSerializer):
    from_account = serializers.IntegerField(write_only=True)
    to_account = serializers.IntegerField(write_only=True)
    money = serializers.IntegerField(write_only=True)
    class Meta:
        model = Account
        fields = ['from_account','to_account', 'money']
    
    def create(self, validated_data):
        money = float(validated_data.pop('money'))
        from_account = validated_data.pop('from_account')
        to_account = validated_data.pop('to_account')
        from_account = Account.objects.get(id=from_account)
        to_account = Account.objects.get(id=to_account)
        if from_account.deposit < money:
            return from_account
        from_account.deposit -= money
        to_account.deposit += money
        from_account.save()
        to_account.save()
        History.objects.create(from_account=from_account,to_account=to_account,money=money)
        return from_account
    

class CreditHistorySerializer(serializers.ModelSerializer):
    
    statement = serializers.SerializerMethodField('statement_method')
    class Meta:
        model = Account
        fields = ['id','statement']
    
    
    def statement_method(self,obj):
        description=[{'amount':i.amount,'sender_account_id':i.from_account.id,'sender_account_name':i.from_account.customer.name,'time':i.datetime} for i in obj.to_histories.all()]
        return description
    
class DebitHistorySerializer(serializers.ModelSerializer):
    
    statement = serializers.SerializerMethodField('statement_method')
    class Meta:
        model = Account
        fields = ['id','statement']
    
    
    def statement_method(self,obj):
        description=[{'amount':i.amount,'receiver_account_id':i.to_account.id,'receiver_account_name':i.to_account.customer.name,'time':i.datetime} for i in obj.from_histories.all()]
        return description

class HistorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = History
        exclude = ['id']
    
    def update(self,instance, validated_data):
        return instance