from django.shortcuts import render
from PIL import Image

# Create your views here.
def site_jogosFera(request):
    return render(request,'site_jogosFera/index.html')