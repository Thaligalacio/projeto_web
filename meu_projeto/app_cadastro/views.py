from django.shortcuts import render, redirect
from .models import Cliente

# Create your views here.
def cadastro(request): #Render já renderiza dentro da pasta templates
    return render(request, 'app_cadastro/cadastro.html')

def cadastro_cliente(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        email = request.POST.get('email')
        telefone = request.POST.get('telefone')

        if nome and email:
            Cliente.objects.create(
                nome=nome,
                email=email,
                telefone=telefone
            )
        return redirect('cadastro_sucesso')
    return render(request, 'app_cadastro/cadastro.html')

def cadastro_sucesso(request):
    return render(request, 'app_cadastro/sucesso.html') 
