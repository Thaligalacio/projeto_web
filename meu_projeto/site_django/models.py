# site_django/models.py
from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=255, default="Sem nome") # <--- O campo é 'nome'
    email = models.EmailField(unique=True, default="Sem email")
    password = models.CharField(max_length=128, default="Sem senha")  # Idealmente, use hash
    # telefone = models.CharField(max_length=15, default='Sem telefone')

    def __str__(self):
        return self.nome

