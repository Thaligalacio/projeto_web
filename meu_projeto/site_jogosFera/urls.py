from django.urls import path
from .views import *

urlpatterns = [
    path('projeto2/', site_jogosFera, name='site_jogosFera')
]
