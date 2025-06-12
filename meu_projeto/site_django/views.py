from django.shortcuts import render, redirect
# Importa o modelo Cliente - Assumindo que Cliente armazena dados adicionais, não a senha.
# A senha será gerenciada pelo User do Django.
from .models import Cliente
from django.contrib import messages
# Importa ClienteForm - Este form deve ser ajustado para não salvar a senha diretamente no Cliente.
from .forms import ClienteForm
from django.db import IntegrityError
from django.http import JsonResponse
# Importações para o sistema de autenticação do Django
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User # Importa o modelo de usuário padrão do Django
from django.views.decorators.http import require_POST # Melhor que csrf_exempt para segurança
import json # Para manipular JSON (usado no login_user)
from PIL import Image # Para manipulação de imagem (função de exemplo)

# Função para a view de recuperação de senha
def recuperar_senha_view(request):
    """
    Renderiza a página de recuperação de senha.
    Você precisará criar o template 'site_django/recuperar_senha.html'.
    """
    return render(request, 'site_django/recuperar_senha.html')

# Função para registro de novos clientes
def registrar_cliente(request):
    """
    Processa o registro de novos clientes.
    - Se a requisição for POST, tenta validar e salvar o formulário.
    - Em caso de sucesso, adiciona uma mensagem de sucesso e redireciona.
    - Em caso de email duplicado ou outros erros de formulário, adiciona uma mensagem de erro
    e RENDERIZA o template, permitindo que a mensagem seja exibida no frontend.
    - Se a requisição não for POST, simplesmente renderiza a página inicial com um formulário vazio.
    """
    # Instancia o formulário com os dados POST, se houver, ou um formulário vazio.
    form = ClienteForm(request.POST or None)
    print("Método da requisição:", request.method) # Para depuração no console do servidor

    if request.method == 'POST':
        print("Formulário POST recebido.") # Para depuração

        if form.is_valid():
            print("Formulário é válido.") # Para depuração
            try:
                # Obter dados do formulário
                nome = form.cleaned_data.get('nome')
                email = form.cleaned_data.get('email')
                password = form.cleaned_data.get('password') # Senha deve vir do form, mas não ser salva diretamente
                # telefone = form.cleaned_data.get('telefone')

                # --- Importante: Crie um usuário Django para autenticação segura ---
                # Verifica se já existe um usuário com este e-mail
                if User.objects.filter(username=email).exists():
                    messages.error(request, 'Este e-mail já está cadastrado. Por favor, use outro. 😞')
                    return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form})

                user = User.objects.create_user(username=email, email=email, password=password)
                user.first_name = nome # Você pode usar o nome do cliente aqui

                # Salva o usuário Django
                user.save()

                # Agora, salve o Cliente, possivelmente vinculando-o ao usuário Django
                # (Assumindo que Cliente não armazena a senha e tem uma FK para User ou é um Perfil de User)
                # Se seu Cliente model tivesse uma OneToOneField para User:
                # cliente = form.save(commit=False)
                # cliente.user = user
                # cliente.save()
                # Ou se Cliente for apenas um perfil adicional, crie-o assim:
                cliente = Cliente.objects.create(nome=nome, email=email)
                # Se você tiver um campo user no Cliente, adicione:
                # cliente.user = user
                # cliente.save()

                print("Cliente e Usuário Django salvos com sucesso!") # Para depuração
                messages.success(request, 'Cadastro realizado com sucesso! 🎉 Agora você pode fazer login.')
                # Em caso de sucesso, redireciona para a página inicial (ou para uma página de login)
                return redirect('pagina_inicial')

            except IntegrityError as e:
                # Captura erros de integridade, como e-mail duplicado (se o campo email for UNIQUE)
                print("Ocorreu um IntegrityError:", e) # Para depuração
                if 'UNIQUE constraint failed' in str(e) and ('site_django_cliente.email' in str(e) or 'auth_user.username' in str(e)):
                    print("Erro de e-mail duplicado detectado!") # Para depuração
                    messages.error(request, 'Este e-mail já está cadastrado. Por favor, use outro. 😞')
                else:
                    messages.error(request, 'Ocorreu um erro ao cadastrar. Tente novamente. 😔')
                return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form})

            except Exception as e:
                # Captura qualquer outra exceção inesperada durante o salvamento
                print("Erro inesperado ao cadastrar:", e) # Para depuração
                messages.error(request, f'Ocorreu um erro inesperado: {e} 😔')
                return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form})
        else:
            # Se o formulário NÃO for válido (ex: campos faltando, formato inválido)
            print("Formulário é inválido:", form.errors) # Para depuração
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f'Erro no campo {field}: {error} 😞')
            return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form})
    else:
        print("Requisição não é POST (GET ou outra).") # Para depuração

    return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form})

# Página inicial do site
def site_django(request):
    """
    Renderiza a página inicial.
    Instancia um formulário de cliente vazio para ser usado em modais de cadastro.
    """
    form_cadastro = ClienteForm() # Instancia o formulário para exibir no modal de cadastro
    # Adicionar mensagem de boas-vindas se o usuário estiver logado
    # Importante: A mensagem de login agora será adicionada dentro do login_user,
    # e esta parte aqui será para mensagens em recarregamentos subsequentes,
    # como se o usuário já estivesse logado ou fosse redirecionado de outras páginas.
    if request.user.is_authenticated:
        # Use first_name se você tiver preenchido no registro, caso contrário, use username
        user_display_name = request.user.first_name if request.user.first_name else request.user.username
        # Evita adicionar a mensagem 'Bem-vindo de volta' se já houver uma mensagem de login recém-adicionada
        # (para evitar duplicidade imediata após o login via AJAX)
        # Uma forma simples de evitar duplicidade pode ser verificar se a mensagem já existe na lista
        # de mensagens, mas isso pode ser complicado. O redirecionamento já limpa as mensagens.
        # Portanto, a lógica principal para "Olá, nome" virá do `login_user` ao redirecionar.
        pass # Vamos lidar com a mensagem de "Olá, nome" no login_user para que ela apareça na primeira carga.

    return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form_cadastro})

# Função de exemplo para redimensionamento de imagem
def redimensionar_imagem(caminho_entrada, caminho_saida):
    """
    Redimensiona uma imagem para uma miniatura (thumbnail) de 300x300 pixels,
    mantendo a proporção.
    """
    img = Image.open(caminho_entrada)
    img.thumbnail((300, 300))
    img.save(caminho_saida)

# Função de login usando o sistema de autenticação do Django
@require_POST # Garante que só aceitará requisições POST
def login_user(request):
    """
    Processa a requisição de login de usuário.
    Esperar dados de 'email' (que será o username para User do Django) e 'password'.
    Retorna JsonResponse com sucesso ou erro, incluindo redirect_url.
    """
    try:
        # Tenta carregar os dados como JSON (para requisições AJAX)
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
    except json.JSONDecodeError:
        # Se não for JSON, tenta pegar os dados de um formulário POST normal
        email = request.POST.get('email')
        password = request.POST.get('password')

    # Usa o email como username para o sistema de autenticação do Django
    user = authenticate(request, username=email, password=password)

    if user is not None:
        # Se as credenciais forem válidas, loga o usuário
        login(request, user)
        # Adiciona a mensagem de sucesso que será exibida após o redirecionamento
        user_display_name = user.first_name if user.first_name else user.username
        messages.success(request, f'Olá, {user_display_name}! 👋')
        
        # Retorna sucesso com a URL de redirecionamento para o frontend
        return JsonResponse({'success': True, 'message': 'Login realizado com sucesso!', 'redirect_url': '/'})
    else:
        # Se as credenciais forem inválidas
        return JsonResponse({'success': False, 'message': 'E-mail ou senha inválidos. 😞'}, status=400)

    # Não precisa de um 'else' para métodos não POST devido ao @require_POST

# Exemplo de função de logout
def logout_user(request):
    logout(request)
    messages.info(request, "Você foi desconectado.")
    return redirect('pagina_inicial') # Redireciona para a página inicial após o logout
