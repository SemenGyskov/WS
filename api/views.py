from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import *
from .serializers import *

class LogOut(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        request.user.auth_token.delete()
        return Response({'data':{'Message':'Logout'}},status = 201)

@api_view(['POST'])
@permission_classes([AllowAny])
def SignupViewDef(request):
    serializer = UserRegSerializer(data = request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'data':{'user_token':Token.objects.create(user = user).key}}, status = HTTP_201_CREATED)
    return Response({'error':{'code':402,'mdessage':'Validation errors','errors': serializer.errors}}, status = HTTP_422_UNPROCESSABLE_ENTITY)


@api_view(['POST'])
@permission_classes([AllowAny])
def LoginViewDef(request):
    serializer = UserLogIn(data = request.data)
    if serializer.is_valid():
        try:
            user = User.objects.get(email = serializer.validated_data['email'], password = serializer.validated_data['password'])
        except:
            return Response({'error':{'code':401,'message':'Authentication failed'}}, status = 401)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'data':{'user_token':token.key}}, status = 200)
    return Response({'error':{'code':422,'message':'Validation errors','errors': serializer.errors}}, status =422)

@api_view(['GET'])
@permission_classes([AllowAny])
def ProductsViewDef(request):
    queryset = Product.objects.all()
    serializer = ProductSerializer(queryset, many = True)
    return Response({'data': serializer.data}, status = 200)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def ProductAddViewDef(request):
    serializer = ProductSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        data = serializer.data
        return Response({'data':{'id': data['id'], 'message':'Product added'}}, status = 201)
    return Response({'error':{'code':422,'message':'Validation errors', 'errors':serializer.errors}})

@api_view(['DELETE','PATCH','GET'])
@permission_classes([IsAdminUser])
def ProductChangeDeleteDef(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except:
        return Response({'error':{'code':404,'message':'Not Found'}}, status = 404)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response({'data': serializer.data}, status = 200)
    elif request.method == 'PATCH':
        serializer = ProductSerializer(product, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status = 200)
        return Response({'error':{'code':422,'message':'Validation errors', 'errors' : serializer.errors}})
    elif request.method == 'DELETE':
        product.delete()
        return Response({'data':{'message':'product removed'}}, status = 200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CartViewDef(request):
    queryset = Cart.objects.all()
    serializer = CartSerializer(queryset, many = True)
    return Response({'data': serializer.data}, status = 200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CartAddViewDef(request):
    if request.user.is_staff:
        return Response({'error':{'code':422,'message':'Вы админ, вам нельзя'}}) #Если админ
    cart = Cart.objects.filter(user = request.user)
    serializer = CartSerializer(cart, many = True)
    data = serializer.data
    return Response({'data': data}, status = 200)


@api_view(['DELETE', 'GET', 'POST'])
@permission_classes([IsAuthenticated])
def CartChangeDeleteDef(request, pk):
    if request.user.is_staff:
        return Response({'error':{"code":403,'message':'Доступ запрещён'}}) #если не админ
    try:
        product = Product.objects.get(pk=pk)
    except:
        return Response({'error':{'code':404,'message':'Not Found'}}, status = 404)
    if request.method == 'POST':
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart.products.add(product)

        return Response({"body":{'message':'Товар добавлен в корзину'}}, status = 201)
    elif request.method == 'DELETE':
        cart = Cart.objects.get(user=request.user)
        cart.products.remove(product)
        return Response({'data':{'message':'Товар удалён'}}, status = 200)

@api_view(['GET', "POST"])
@permission_classes([IsAuthenticated])
def OrderViewDef(request):
    if request.user.is_staff:
        return Response({'error':{"code":403,'message':'Вы админ, вам нельзя'}})
    if request.method =="GET":
        queryset = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(queryset, many = True)
        return Response({'data': serializer.data}, status = 200)
    elif request.method == "POST":
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({'error':'Корзина пуста'})
        order = Order.objects.create(user=request.user)
        for product in cart.products.all():
            order.products.add(product)
        order.save()
        cart.delete()
        serializer = OrderSerializer(order)
        return Response({'data': serializer.data})


@api_view(['DELETE','PATCH','GET'])
@permission_classes([IsAuthenticated])
def OrderChangeDeleteDef(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except:
        return Response({'error':{'code':404,'message':'Not Found'}}, status = 404)
    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return Response({'data': serializer.data}, status = 200)
    elif request.method == 'PATCH':
        serializer = OrderSerializer(order, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status = 200)
        return Response({'error':{'code':422,'message':'Validation errors', 'errors' : serializer.errors}})
    elif request.method == 'DELETE':
        order.delete()
        return Response({'data':{'message':'Order removed'}}, status = 200)