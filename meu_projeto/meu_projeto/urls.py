from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('site_django.urls')),
    path('', include('core.urls')),
    path('', include('site_institucional.urls')),
    path('', include('app_cadastro.urls')),
    path('', include('site_jogosFera.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    