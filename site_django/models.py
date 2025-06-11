from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=50, default='Sem nome')
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Idealmente, use hash
    telefone = models.CharField(max_length=15, default='Sem telefone')

    def __str__(self):
        return self.nome
