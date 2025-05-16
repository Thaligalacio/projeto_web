document.addEventListener("DOMContentLoaded", function () {
    // ... seu código JavaScript existente ...

    const showRegisterFormLink = document.getElementById("show-register-form");
    const showLoginFormLink = document.getElementById("show-login-form");
    const loginContent = document.getElementById("login-content");
    const registerFormInsideLogin = document.getElementById("register-form-inside-login");
    const loginFormElementParaFechar = document.getElementById("login-form"); // Para fechar o modal inteiro

    if (showRegisterFormLink && loginContent && registerFormInsideLogin) {
        showRegisterFormLink.addEventListener("click", function (event) {
            event.preventDefault();
            loginContent.style.display = "none";
            registerFormInsideLogin.style.display = "block";
        });
    }

    if (showLoginFormLink && loginContent && registerFormInsideLogin) {
        showLoginFormLink.addEventListener("click", function (event) {
            event.preventDefault();
            registerFormInsideLogin.style.display = "none";
            loginContent.style.display = "block";
        });
    }
});

    // Lógica para abrir/fechar o modal de login
    if (loginBtnElement && loginFormElement) {
        loginFormElement.style.display = "none";
        loginBtnElement.addEventListener("click", function () {
            loginFormElement.style.display = loginFormElement.style.display === "none" ? "block" : "none";
        });
    }

    if (closeLoginModal && loginFormElementParaFechar) {
        closeLoginModal.addEventListener("click", () => {
            loginFormElementParaFechar.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (loginFormElementParaFechar && event.target === loginFormElementParaFechar) {
            loginFormElementParaFechar.style.display = "none";
        }
    });

    // Lógica para o modal de cadastro (abrir/fechar)
    const registerBtn = document.getElementById("register-btn");
    const registerModal = document.getElementById("register-modal");
    const closeRegisterModal = document.getElementById("close-register-modal");

    if (registerBtn && registerModal) {
        registerBtn.addEventListener("click", () => {
            registerModal.style.display = "block";
        });
    }

    if (closeRegisterModal && registerModal) {
        closeRegisterModal.addEventListener("click", () => {
            registerModal.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (registerModal && event.target === registerModal) {
            registerModal.style.display = "none";
        }
    });

    // Lógica para o dropdown de categorias
    const categoryBtn = document.getElementById("category-btn");
    const categoryMenu = document.getElementById("category-menu");

    if (categoryBtn && categoryMenu) {
        categoryBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            const rect = categoryBtn.getBoundingClientRect();
            categoryMenu.style.left = `${rect.left}px`;
            categoryMenu.style.top = `${rect.bottom + window.scrollY}px`;
            categoryMenu.style.display = categoryMenu.style.display === "block" ? "none" : "block";
        })
    }

    document.addEventListener("DOMContentLoaded", function () {
    const categoryBtn = document.getElementById("category-btn");
    const categoryMenu = document.getElementById("category-menu");
    const gameCards = document.querySelectorAll(".game-card");
    const loginBtnElement = document.getElementById("login-btn");
    const loginFormElement = document.getElementById("login-form");
    const closeLoginModal = document.getElementById("close-login-modal");
    const loginFormElementParaFechar = document.getElementById("login-form");
    const showRegisterFormLink = document.getElementById("show-register-form");
    const showLoginFormLink = document.getElementById("show-login-form");
    const loginContent = document.getElementById("login-content");
    const registerFormInsideLogin = document.getElementById("register-form-inside-login");

    // Lógica para abrir/fechar o modal de login
    if (loginBtnElement && loginFormElement) {
        loginFormElement.style.display = "none";
        loginBtnElement.addEventListener("click", function () {
            loginFormElement.style.display = loginFormElement.style.display === "none" ? "block" : "none";
        });
    }

    if (closeLoginModal && loginFormElementParaFechar) {
        closeLoginModal.addEventListener("click", () => {
            loginFormElementParaFechar.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (loginFormElementParaFechar && event.target === loginFormElementParaFechar) {
            loginFormElementParaFechar.style.display = "none";
        }
    });

    // Lógica para o dropdown de categorias (mantive esta parte)
    if (categoryBtn && categoryMenu) {
        categoryBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            const rect = categoryBtn.getBoundingClientRect();
            categoryMenu.style.left = `${rect.left}px`;
            categoryMenu.style.top = `${rect.bottom + window.scrollY}px`;
            categoryMenu.style.display = categoryMenu.style.display === "block" ? "none" : "block";
        });
    }

    document.addEventListener("click", function (event) {
        if (categoryMenu && !categoryMenu.contains(event.target) && event.target !== categoryBtn) {
            categoryMenu.style.display = "none";
        }
    });

    if (categoryMenu) {
        categoryMenu.querySelectorAll("li").forEach(categoryItem => {
            categoryItem.addEventListener("click", function () {
                let selectedCategory = this.getAttribute("data-category");
                if (selectedCategory === "all") {
                    gameCards.forEach(card => card.style.display = "block");
                } else {
                    gameCards.forEach(card => {
                        card.style.display = card.dataset.category === selectedCategory ? "block" : "none";
                    });
                }
                categoryMenu.style.display = "none";
            });
        });
    }

    // Lógica para alternar entre login e cadastro DENTRO do modal de login
    if (showRegisterFormLink && loginContent && registerFormInsideLogin) {
        showRegisterFormLink.addEventListener("click", function (event) {
            event.preventDefault();
            loginContent.style.display = "none";
            registerFormInsideLogin.style.display = "block";
        });
    }

    if (showLoginFormLink && loginContent && registerFormInsideLogin) {
        showLoginFormLink.addEventListener("click", function (event) {
            event.preventDefault();
            registerFormInsideLogin.style.display = "none";
            loginContent.style.display = "block";
        });
    }
});

// tempo de apresentação da mensagem de cadastro
document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
        const successMessage = messagesContainer.querySelector('.success-message');
        if (successMessage) {
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000); // A mensagem desaparece após 5 segundos (5000 milissegundos)
        }
    }
});