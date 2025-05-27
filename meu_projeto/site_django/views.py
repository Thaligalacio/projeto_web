from django.shortcuts import render, redirect
from .models import Cliente
from django.contrib import messages
from .forms import ClienteForm
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from PIL import Image

def recuperar_senha_view(request):
    # Sua lógica para a recuperação de senha aqui
    return render(request, 'site_django/recuperar_senha.html') # Crie este template se ainda não existir

#função para registro de clientes
def registrar_cliente(request):
    form = ClienteForm(request.POST or None)
    print("Método da requisição:", request.method)
    if request.method == 'POST':

        print("Formulário POST recebido.")
        if form.is_valid():
            print("Formulário é válido.")
            try:
                print("Tentando salvar o formulário...")
                cliente = form.save()
                print("Cliente salvo com sucesso:", cliente)
                messages.success(request, 'Cadastro realizado com sucesso!')
                return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': ClienteForm()}) # Limpa o formulário após sucesso
            except IntegrityError as e:
                print("Ocorreu um IntegrityError:", e)
                if 'UNIQUE constraint failed: site_django_cliente.email' in str(e):
                    print("Erro de e-mail duplicado detectado!")
                    return JsonResponse({'error': 'Este e-mail já está em uso.'}, status=400)
                else:
                    form.add_error(None, 'Ocorreu um erro ao cadastrar. Tente novamente.')
                    print("Erro desconhecido ao cadastrar:", e)
        else:
            print("Formulário é inválido:", form.errors)
            # Se o formulário NÃO for válido, vamos retornar um JSON de erro
            if 'email' in form.errors:
                return JsonResponse({'error': form.errors['email'][0]}, status=400)
            else:
                return JsonResponse({'error': 'Erro no formulário de cadastro.'}, status=400)
    else:
        print("Requisição não é POST.")

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

        else:
            print("Formulário inválido:", form.errors)
        # Se o formulário não for válido, ele será re-renderizado com os erros
        