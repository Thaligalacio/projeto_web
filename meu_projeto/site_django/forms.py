# site_django/forms.py

from django import forms
from .models import Cliente
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

class ClienteForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = Cliente
        fields = ['nome', 'email', 'password', 'telefone']

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(label='Email ou Usuário')
    password = forms.CharField(widget=forms.PasswordInput)
