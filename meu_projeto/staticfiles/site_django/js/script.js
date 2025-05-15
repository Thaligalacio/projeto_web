document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById("signup-btn");
    const signupModal = document.getElementById("signup-modal");
    const closeModal = document.getElementById("close-modal");
    const signupForm = document.getElementById("signupForm");
    const successMessage = document.getElementById("success-message");

    // Abrir modal ao clicar em "Cadastro"
    signupBtn.addEventListener("click", () => {
        signupModal.style.display = "block";
    });

    // Fechar modal ao clicar no X
    closeModal.addEventListener("click", () => {
        signupModal.style.display = "none";
    });

    // Fechar modal se clicar fora do conteúdo
    window.addEventListener("click", (event) => {
        if (event.target === signupModal) {
            signupModal.style.display = "none";
        }
    });

    // Submissão do formulário de cadastro
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Exibe mensagem de sucesso
        successMessage.style.display = "block";

        // Fecha o modal
        signupModal.style.display = "none";

        // Limpa o formulário
        signupForm.reset();

        // Oculta mensagem após 3 segundos
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 6000);
    });

    // Categoria dropdown (mantém sua funcionalidade original)
    const categoryBtn = document.getElementById("category-btn");
    const categoryMenu = document.getElementById("category-menu");
    const gameCards = document.querySelectorAll(".game-card");

    categoryBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        categoryMenu.style.display = categoryMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!categoryMenu.contains(event.target) && event.target !== categoryBtn) {
            categoryMenu.style.display = "none";
        }
    });

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
});

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn"); // Botão de Login
    const loginForm = document.getElementById("login-form"); // Formulário de Login

    // Inicialmente o formulário de Login está escondido
    loginForm.style.display = "none";

    // Quando o botão de Login for clicado, mostra ou esconde o formulário de Login
    loginBtn.addEventListener("click", function () {
        if (loginForm.style.display === "none") {
            loginForm.style.display = "block"; // Mostra o formulário
        } else {
            loginForm.style.display = "none"; // Esconde o formulário
        }
    });

    // Manipulador do formulário de Login
    const loginFormElement = document.getElementById("loginForm");

    // Quando o formulário de Login for enviado
    loginFormElement.addEventListener("submit", function (event) {
        event.preventDefault(); // Não envia o formulário de verdade, só simula

        // Exibe uma mensagem de sucesso (você pode personalizar isso)
        alert("Login realizado com sucesso!");

        // Limpa os campos do formulário
        loginFormElement.reset();

        // Após 2 segundos, esconde o formulário
        setTimeout(() => {
            loginForm.style.display = "none";
        }, 2000);
    });
});
