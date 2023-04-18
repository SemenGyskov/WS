from django.urls import path, include
from .views import *
urlpatterns = [
    path('logout/', LogOut.as_view()),
    path('signup/', SignupViewDef),
    path('login/', LoginViewDef),
    path('products/', ProductsViewDef),
    path('product/', ProductAddViewDef),
    path('product/<int:pk>/', ProductChangeDeleteDef),
    path('carts/', CartViewDef),
    path('cart/', CartAddViewDef),
    path('cart/<int:pk>/', CartChangeDeleteDef),
    path('order/', OrderViewDef),
    path('order/<int:pk>/', OrderChangeDeleteDef),
]
