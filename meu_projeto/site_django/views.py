from django.shortcuts import render
from .models import Cliente
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from PIL import Image

# Página inicial
def site_django(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        email = request.POST.get('email') 
        password = request.POST.get('password') 
        telefone = request.POST.get('telefone')

        if password and email:
            Cliente.objects.create(
                nome=nome,
                email=email,
                password=password,  # Ideal: usar hash
                telefone=telefone
            )
            sucesso = True
        else:
            sucesso = False

        return render(request, 'site_django/pagina_inicial.html', {'sucesso': sucesso})

    return render(request, 'site_django/pagina_inicial.html')


# Exemplo de redimensionamento de imagem (não está integrado com upload ainda)
def redimensionar_imagem(caminho_entrada, caminho_saida):
    img = Image.open(caminho_entrada)
    img.thumbnail((300, 300))
    img.save(caminho_saida)

# Exemplo simples de login (não usa modelo de usuário do Django)
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            cliente = Cliente.objects.get(email=email, password=password)
            return JsonResponse({'success': True})
        except Cliente.DoesNotExist:
            return JsonResponse({'error': 'Credenciais inválidas'}, status=401)
