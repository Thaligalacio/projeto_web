from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('site_django.urls')), # Esta será sua homepage principal
    path('core/', include('core.urls')), # Adicionado prefixo 'core/'
    path('institucional/', include('site_institucional.urls')), # Adicionado prefixo 'institucional/'
    path('cadastro/', include('app_cadastro.urls')), # Adicionado prefixo 'cadastro/'
    path('jogos/', include('site_jogosFera.urls')), # Adicionado prefixo 'jogos/'
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    