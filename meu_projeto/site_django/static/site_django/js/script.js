document.addEventListener("DOMContentLoaded", function () {
    // Elementos principais
    const showRegisterFormLink = document.getElementById("show-register-form");
    const showLoginFormLink = document.getElementById("show-login-form");
    const loginContent = document.getElementById("login-content");
    const registerFormInsideLogin = document.getElementById("register-form-inside-login");

    const loginBtn = document.getElementById("login-btn");
    const loginModal = document.getElementById("login-form");
    const closeLoginModal = document.getElementById("close-login-modal");

    const registerBtn = document.getElementById("register-btn");
    const registerModal = document.getElementById("register-modal");
    const closeRegisterModal = document.getElementById("close-register-modal");

    const categoryBtn = document.getElementById("category-btn");
    const categoryMenu = document.getElementById("category-menu");
    const gameCards = document.querySelectorAll(".game-card");

    // Alternar entre login e cadastro DENTRO do modal de login
    if (showRegisterFormLink && showLoginFormLink && loginContent && registerFormInsideLogin) {
        showRegisterFormLink.addEventListener("click", function (event) {
            event.preventDefault();
            loginContent.style.display = "none";
            registerFormInsideLogin.style.display = "block";
        });

        showLoginFormLink.addEventListener("click", function (event) {
            event.preventDefault();
            registerFormInsideLogin.style.display = "none";
            loginContent.style.display = "block";
        });
    }

    // Abrir/fechar modal de login
    if (loginBtn && loginModal) {
        loginModal.style.display = "none";

        loginBtn.addEventListener("click", function () {
            loginModal.style.display = loginModal.style.display === "none" ? "block" : "none";
        });

        if (closeLoginModal) {
            closeLoginModal.addEventListener("click", () => {
                loginModal.style.display = "none";
            });
        }

        window.addEventListener("click", (event) => {
            if (event.target === loginModal) {
                loginModal.style.display = "none";
            }
        });
    }

    // Abrir/fechar modal de cadastro
    if (registerBtn && registerModal) {
        registerBtn.addEventListener("click", () => {
            registerModal.style.display = "block";
        });

        if (closeRegisterModal) {
            closeRegisterModal.addEventListener("click", () => {
                registerModal.style.display = "none";
            });
        }

        window.addEventListener("click", (event) => {
            if (event.target === registerModal) {
                registerModal.style.display = "none";
            }
        });
    }

    // Dropdown de categorias
    if (categoryBtn && categoryMenu) {
        categoryBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            const rect = categoryBtn.getBoundingClientRect();
            categoryMenu.style.left = `${rect.left}px`;
            categoryMenu.style.top = `${rect.bottom + window.scrollY}px`;
            categoryMenu.style.display = categoryMenu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function (event) {
            if (!categoryMenu.contains(event.target) && event.target !== categoryBtn) {
                categoryMenu.style.display = "none";
            }
        });

        categoryMenu.querySelectorAll("li").forEach(categoryItem => {
            categoryItem.addEventListener("click", function () {
                const selectedCategory = this.getAttribute("data-category");
                gameCards.forEach(card => {
                    card.style.display = (selectedCategory === "all" || card.dataset.category === selectedCategory)
                        ? "block" : "none";
                });
                categoryMenu.style.display = "none";
            });
        });
    }

    // Mensagem de sucesso desaparece depois de 3s
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
        const successMessage = messagesContainer.querySelector('.success-message');
        if (successMessage) {
            setTimeout(function () {
                successMessage.style.display = 'none';
            }, 3000);
        }
    }

    // Envio do formulário de cadastro (AJAX)
    const registerFormInside = document.getElementById('registerFormInside');
    if (registerFormInside) {
        registerFormInside.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(response => {
                const alertMessageDiv = document.getElementById('register-alert-message');
                if (!response.ok) {
                    response.json().then(data => {
                        if (data.error && alertMessageDiv) {
                            alertMessageDiv.textContent = data.error;
                            alertMessageDiv.style.display = 'block';
                            setTimeout(() => {
                                alertMessageDiv.style.display = 'none';
                            }, 3000);
                        } else {
                            alert('Ocorreu um erro no cadastro.');
                        }
                    }).catch(() => {
                        alert('Ocorreu um erro no cadastro.');
                    });
                } else {
                    response.text().then(data => {
                        if (alertMessageDiv) {
                            alertMessageDiv.textContent = 'Cadastro realizado com sucesso!';
                            alertMessageDiv.style.backgroundColor = '#c8e6c9';
                            alertMessageDiv.style.borderColor = '#81c784';
                            alertMessageDiv.style.color = '#1b5e20';
                            alertMessageDiv.style.display = 'block';
                            setTimeout(() => {
                                alertMessageDiv.style.display = 'none';
                                registerFormInside.reset();
                            }, 3000);
                        } else {
                            alert('Cadastro realizado com sucesso!');
                            registerFormInside.reset();
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro inesperado.');
            });
        });
    }

    // Envio do formulário de login (AJAX)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');

            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;

                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password);

                const loginUrl = loginForm.getAttribute('data-login-url'); // <- Use data attribute no HTML

                fetch(loginUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Login realizado com sucesso!');
                        window.location.href = data.redirect_url || '/';
                    } else if (data.error) {
                        const errorMessageContainer = document.getElementById('error-message-container');
                        if (errorMessageContainer) {
                            errorMessageContainer.textContent = data.error;
                            errorMessageContainer.style.display = 'block';
                            setTimeout(() => {
                                errorMessageContainer.style.display = 'none';
                            }, 3000);
                        } else {
                            alert('Erro no login: ' + data.error);
                        }
                    } else {
                        alert('Resposta inesperada do servidor.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao fazer login:', error);
                    alert('Ocorreu um erro ao tentar fazer login.');
                });
            }
        });
    }
});
