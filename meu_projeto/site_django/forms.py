# forms.py

from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

# Formulário de cadastro (estende UserCreationForm do Django)
class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

# Formulário de login (pode usar diretamente AuthenticationForm se quiser)
class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(label='Email ou Usuário')
    password = forms.CharField(widget=forms.PasswordInput)
