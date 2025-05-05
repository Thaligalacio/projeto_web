from django.urls import path
from .views import *

urlpatterns = [
    path('projeto/', site_django, name='site_django')
]
