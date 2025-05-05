from django.shortcuts import render
from datetime import datetime
from zoneinfo import ZoneInfo

# Create your views here.
def homepage(request):
    fusohorario = ZoneInfo("America/Sao_Paulo")    
    hora_atual = datetime.now(fusohorario).hour
    hora_completa = datetime.now(fusohorario)
    hora_formatada = hora_completa.strftime("%H:%M:%S")

    if hora_atual < 12:
        saudacao = "Bom dia"

    elif hora_atual < 18:
        saudacao = "boa tarde"

    else:
        saudacao = "Boa noite"        

    contexto = {'nome': 'Guilherme', 'saudacao': saudacao,
                'hora' : hora_formatada
                }
    return render(request, 'core/index.html', contexto)