from django.urls import path
from . import views
from .views import cadastro_cliente, cadastro_sucesso

urlpatterns = [
    path('cadastro/', views.cadastro_cliente, name='cadastro_cliente'),
    path('cadastro/sucesso/', views.cadastro_sucesso, name='cadastro_sucesso'),
]