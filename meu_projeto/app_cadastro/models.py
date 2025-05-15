from django.db import models

# Create your models here.

class Cliente(models.Model):
    nome= models.CharField(max_length=100)
    email= models.EmailField(unique=True)
    telefone= models.CharField(max_length=20, blank=True, null=True)
    data_cadastro= models.DateTimeField(auto_now_add=True)
    