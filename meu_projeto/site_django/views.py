from django.shortcuts import render

from PIL import Image
# Create your views here.
def site_django(request):
    return render(request,'site_django/pagina_inicial.html')


def redimensionar_imagem():
    img = Image.open()
    img.thumbnail((300, 300))
    img.save("media/imagens/miniatura.jpg")

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Credenciais inválidas'}, status=401)
