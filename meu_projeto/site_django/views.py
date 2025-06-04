from django.shortcuts import render, redirect
from .models import Cliente # Importa o modelo Cliente
from django.contrib import messages # Importa o sistema de mensagens do Django
from .forms import ClienteForm # Importa o ClienteForm
from django.db import IntegrityError # Para tratar erros de integridade do banco de dados (ex: email duplicado)
from django.http import JsonResponse # Manteremos JsonResponse APENAS para a função de login_user se ela for AJAX
from django.views.decorators.csrf import csrf_exempt # Para desabilitar a proteção CSRF em APIs (usado no login_user)
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
    e redireciona, permitindo que a mensagem seja exibida no frontend.
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
                print("Tentando salvar o formulário...") # Para depuração
                cliente = form.save() # Salva o cliente no banco de dados
                print("Cliente salvo com sucesso:", cliente) # Para depuração
                # Adiciona uma mensagem de sucesso que será exibida no template
                messages.success(request, 'Cadastro realizado com sucesso! 🎉 Agora você pode fazer login.')
                # Redireciona para a página inicial. O 'sucesso' não precisa mais ser passado via contexto,
                # pois o sistema de mensagens do Django se encarrega disso.
                return redirect('pagina_inicial')

            except IntegrityError as e:
                # Captura erros de integridade, como e-mail duplicado (se o campo email for UNIQUE)
                print("Ocorreu um IntegrityError:", e) # Para depuração
                if 'UNIQUE constraint failed: site_django_cliente.email' in str(e):
                    print("Erro de e-mail duplicado detectado!") # Para depuração
                    # Adiciona uma mensagem de erro específica para e-mail duplicado
                    messages.error(request, 'Este e-mail já está cadastrado. Por favor, use outro. 😞')
                else:
                    # Adiciona uma mensagem de erro genérica para outros erros de integridade
                    messages.error(request, 'Ocorreu um erro ao cadastrar. Tente novamente. 😔')
                # Em ambos os casos de erro, redireciona para a página inicial.
                return redirect('pagina_inicial')

            except Exception as e:
                # Captura qualquer outra exceção inesperada durante o salvamento
                print("Erro inesperado ao cadastrar:", e) # Para depuração
                messages.error(request, f'Ocorreu um erro inesperado: {e} 😔')
                return redirect('pagina_inicial')
        else:
            # Se o formulário NÃO for válido (ex: campos faltando, formato inválido)
            print("Formulário é inválido:", form.errors) # Para depuração
            # Adiciona uma mensagem de erro com os detalhes dos erros do formulário
            # Você pode iterar sobre form.errors se quiser mais detalhes específicos no frontend.
            for field, errors in form.errors.items():
                for error in errors:
                    # Adiciona cada erro do formulário como uma mensagem separada
                    messages.error(request, f'Erro no campo {field}: {error} 😞')
            # Redireciona de volta para a página inicial para exibir os erros
            return redirect('pagina_inicial')
    else:
        # Se a requisição for GET, apenas renderiza a página inicial com o formulário vazio
        print("Requisição não é POST (GET ou outra).") # Para depuração

    # Renderiza a página inicial com o formulário de cadastro (vazio para GET requests)
    return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form})

# Página inicial do site
def site_django(request):
    """
    Renderiza a página inicial.
    Instancia um formulário de cliente vazio para ser usado em modais de cadastro.
    """
    form_cadastro = ClienteForm() # Instancia o formulário para exibir no modal de cadastro
    # Você pode adicionar lógica para 'usuario_logado_nome' aqui, se estiver usando sessões ou autenticação do Django.
    # Exemplo: usuario_logado_nome = request.session.get('usuario_nome')
    # Ou se você usar o sistema de autenticação nativo do Django:
    # if request.user.is_authenticated:
    #     messages.info(request, f'Bem-vindo de volta, {request.user.username} 👋')

    return render(request, 'site_django/pagina_inicial.html', {'form_cadastro': form_cadastro})

# Função de exemplo para redimensionamento de imagem
# Esta função não está integrada com um fluxo de upload de arquivos no momento.
def redimensionar_imagem(caminho_entrada, caminho_saida):
    """
    Redimensiona uma imagem para uma miniatura (thumbnail) de 300x300 pixels,
    mantendo a proporção.
    """
    img = Image.open(caminho_entrada)
    img.thumbnail((300, 300))
    img.save(caminho_saida)

# Exemplo de função de login usando AJAX/JSON
@csrf_exempt # Use @csrf_exempt com cautela, apenas para APIs onde o CSRF token não pode ser enviado.
            # Para forms HTML normais, é melhor usar o {% csrf_token %} e não desabilitar.
def login_user(request):
    """
    Processa a requisição de login de usuário via AJAX.
    Espera um JSON com 'email' e 'password'.
    Retorna JsonResponse com sucesso ou erro.
    NOTA: Para uma aplicação real, é altamente recomendado usar o sistema de autenticação
        nativo do Django (django.contrib.auth) para segurança, que lida com hash de senhas,
        sessões, etc. Este é um exemplo simplificado.
    """
    if request.method == 'POST':
        try:
            # Carrega os dados JSON do corpo da requisição
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password') # Senha em texto claro (inseguro para produção!)

            # Tenta encontrar um cliente com o email e a senha fornecidos
            cliente = Cliente.objects.get(email=email, password=password)
            # Se encontrado, retorna sucesso
            # Você pode querer armazenar o status de login em uma sessão aqui
            # Ex: request.session['usuario_logado'] = cliente.email
            return JsonResponse({'success': True})
        except Cliente.DoesNotExist:
            # Se o cliente não for encontrado (credenciais inválidas)
            return JsonResponse({'error': 'E-mail ou senha inválidos. 😞'}, status=401)
        except json.JSONDecodeError:
            # Se o corpo da requisição não for um JSON válido
            return JsonResponse({'error': 'Requisição inválida.'}, status=400)
        except Exception as e:
            # Captura qualquer outro erro inesperado
            return JsonResponse({'error': f'Ocorreu um erro no login: {e}'}, status=500)
    else:
        # Se a requisição não for POST
        return JsonResponse({'error': 'Método não permitido.'}, status=405)