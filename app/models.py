from django.db import models

# Create your models here.

class Customer(models.Model):
    name = models.CharField(max_length=100,default='')
    def __str__(self):
        return self.name
    
class Account(models.Model):
    customer = models.ForeignKey('Customer', related_name='accounts', on_delete=models.CASCADE)
    deposit = models.PositiveBigIntegerField(default=0)
    def __str__(self):
        if self.customer:
            return f'{self.customer.name}: {self.deposit}'
        return ''
    
class History(models.Model):
    from_account = models.ForeignKey('Account', related_name='from_histories', on_delete=models.CASCADE)
    to_account = models.ForeignKey('Account', related_name='to_histories', on_delete=models.CASCADE)
    amount = models.PositiveBigIntegerField(default=0)
    datetime = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-datetime']
    def __str__(self):
        if self.from_account:
            if self.from_account.customer:
                return f'{self.from_account.customer.name}: {self.money}'
            return ''
        return ''