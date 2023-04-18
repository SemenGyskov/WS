from rest_framework import serializers
from .models import *

class UserRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['fio', 'email', 'password']

    def save(self, **kwargs):
        user = User(
            email = self.validated_data['email'],
            fio = self.validated_data['fio'],
            username = self.validated_data['fio'],
            password = self.validated_data['password']
        )
        user.save()
        return user

class UserLogIn(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    products = ProductSerializer(many=True)
    class Meta:
        model = Cart
        fields = '__all__'

