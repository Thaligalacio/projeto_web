# site_django/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.site_django, name='pagina_inicial'),
    path('registrar/', views.registrar_cliente, name='registrar_cliente'),
    path('login/', views.login_user, name='login_user'),
    # Adicione outras URLs específicas da sua app site_django aqui, se houver
]
