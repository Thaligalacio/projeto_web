# site_django/forms.py

from django import forms
from .models import Cliente
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate # Necessário para CustomAuthenticationForm

class ClienteForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(), required=True, label="Senha")
    password_confirm = forms.CharField(widget=forms.PasswordInput(), required=True, label="Confirmar Senha")

    class Meta:
        model = Cliente
        fields = ['nome', 'email'] # <-- Mude para 'nome' para corresponder ao models.py
                                                # Removido 'password' daqui, pois não é campo do modelo Cliente.

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].required = True

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(username=email).exists():
            raise forms.ValidationError("Este e-mail já está cadastrado. Por favor, use outro.")
        return email

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        password_confirm = cleaned_data.get('password_confirm')

        if password and password_confirm and password != password_confirm:
            self.add_error('password_confirm', "As senhas não coincidem.")
        return cleaned_data

# Mantenha CustomUserCreationForm e CustomAuthenticationForm se você os estiver usando
class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True, label="Email")

    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('email',)

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("Este nome de usuário já está em uso.")
        return username

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Este e-mail já está cadastrado.")
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = self.cleaned_data["email"]
        if commit:
            user.save()
        return user

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(label='Email')
    password = forms.CharField(widget=forms.PasswordInput, label='Senha')

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username and password:
            self.user_cache = authenticate(self.request, username=username, password=password)
            if self.user_cache is None:
                raise forms.ValidationError(
                    self.error_messages['invalid_login'],
                    code='invalid_login',
                    params={'username': self.username_field},
                )
        return self.cleaned_data