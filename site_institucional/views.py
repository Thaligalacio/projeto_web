from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def institucional(request):
    return HttpResponse ("Bem-vindo ao site institucional!")