document.addEventListener("DOMContentLoaded", function () {
    // Fechar modal de Login
    const closeLoginModal = document.getElementById("close-login-modal");
    const loginFormElementParaFechar = document.getElementById("login-form");
    const loginBtnElement = document.getElementById("login-btn");
    const loginFormElement = document.getElementById("login-form");

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
        });
    }

    document.addEventListener("click", function (event) {
        if (categoryMenu && !categoryMenu.contains(event.target) && event.target !== categoryBtn) {
            categoryMenu.style.display = "none";
        }
    });
});
