from django.shortcuts import render, redirect
from .models import Cliente
from django.contrib import messages
from .forms import ClienteForm
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from PIL import Image

def registrar_cliente(request):
    form = ClienteForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            try:
                form.save()
                messages.success(request, 'Cadastro realizado com sucesso!')
                # Não redireciona, renderiza a página inicial novamente com a mensagem
            except IntegrityError as e:
                if 'UNIQUE constraint failed: site_django_cliente.email' in str(e):
                    form.add_error('email', 'Este e-mail já está em uso.')
                else:
                    form.add_error(None, 'Ocorreu um erro ao cadastrar. Tente novamente.')
        # Se o formulário não for válido, ele será re-renderizado com os erros

    return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form})

# Página inicial
def site_django(request):
    form_cadastro = ClienteForm() # Instancia o formulário para exibir no modal
    return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form_cadastro})

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
        
def registrar_cliente(request):
    form = ClienteForm(request.POST or None)
    print("Método:", request.method)
    if request.method == 'POST':
        print("POST recebido")
        if form.is_valid():
            print("Formulário válido")
            try:
                form.save()
                messages.success(request, 'Cadastro realizado com sucesso!')
                print("Cadastro realizado com sucesso!")
                # Não redireciona, renderiza a página inicial novamente com a mensagem
            except IntegrityError as e:
                if 'UNIQUE constraint failed: site_django_cliente.email' in str(e):
                    form.add_error('email', 'Este e-mail já está em uso.')
                    print("Erro: E-mail já em uso.")
                else:
                    form.add_error(None, 'Ocorreu um erro ao cadastrar. Tente novamente.')
                    print("Erro desconhecido ao cadastrar.")
        else:
            print("Formulário inválido:", form.errors)
        # Se o formulário não for válido, ele será re-renderizado com os erros

    return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form})