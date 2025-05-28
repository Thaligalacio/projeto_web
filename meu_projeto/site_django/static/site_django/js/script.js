console.log("Arquivo script.js carregado!");

document.addEventListener("DOMContentLoaded", function () {
    initCategoryDropdown();
    initCategoryFilter();
    initLoginModal();
    initRegisterModal();
    initForgotPassword();
    initSearchBar();
});

// ------------------------ CATEGORIAS ------------------------

function initCategoryDropdown() {
    const categoryBtn = document.getElementById("category-btn");
    const dropdown = categoryBtn.parentElement;
    const categoryMenu = document.getElementById('category-menu');

  // Toggle menu visibilidade
    categoryBtn.addEventListener('click', () => {
    const isVisible = categoryMenu.style.display === 'block';
    categoryMenu.style.display = isVisible ? 'none' : 'block';
    });

  // Ao clicar numa categoria
    categoryMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
    e.preventDefault();
    const categoria = link.getAttribute('data-category');
      categoryBtn.textContent = categoria;  // muda texto do botão
      categoryMenu.style.display = 'none';  // fecha menu
    });
    });

  // Fecha menu se clicar fora
    document.addEventListener('click', (e) => {
    if (!categoryBtn.contains(e.target) && !categoryMenu.contains(e.target)) {
    categoryMenu.style.display = 'none';
    }
});

    document.addEventListener("click", event => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });
}

function initCategoryFilter() {
    const categoryLinks = document.querySelectorAll("#category-menu a");
    const gameCards = document.querySelectorAll(".game-card");

    categoryLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const categoria = link.textContent.toLowerCase().replace("ç", "c").replace(" ", "_");

            gameCards.forEach(card => {
                const categoriaCard = card.getAttribute("data-category");
                card.style.display = (categoria === "menu_principal" || categoriaCard === categoria) ? "block" : "none";
            });

            document.getElementById("category-btn").parentElement.classList.remove("show");
        });
    });
}

// ------------------------ LOGIN ------------------------

function initLoginModal() {
    const loginBtn = document.getElementById("login-btn");
    const loginForm = document.getElementById("login-form");
    const closeLoginModalBtn = document.getElementById("close-login-modal");
    const loginContentDiv = document.getElementById("login-content");
    const registerFormDiv = document.getElementById("register-form-inside-login");
    const forgotPasswordDiv = document.getElementById("forgot-password-content");
    const forgotPasswordDialog = document.getElementById("forgot-password-dialog");

    loginBtn?.addEventListener("click", () => {
        showLoginForm();
    });

    closeLoginModalBtn?.addEventListener("click", () => {
        loginForm.style.display = "none";
    });

    window.addEventListener("click", event => {
        if (event.target === loginForm) {
            hideAllLoginSections();
            loginForm.style.display = "none";
        }
    });

    function showLoginForm() {
        loginForm.style.display = "block";
        loginContentDiv.style.display = "block";
        registerFormDiv.style.display = "none";
        forgotPasswordDiv.style.display = "none";
        forgotPasswordDialog?.style?.display = "none";
    }

    function hideAllLoginSections() {
        loginContentDiv.style.display = "block";
        forgotPasswordDiv.style.display = "none";
        forgotPasswordDialog?.style?.display = "none";
        document.querySelector("#login-form .modal-content.login-content h2")?.style?.display = "block";
    }
}

// ------------------------ CADASTRO ------------------------

function initRegisterModal() {
    const showRegisterFormLink = document.getElementById("show-register-form");
    const registerModal = document.getElementById("register-modal");
    const loginForm = document.getElementById("login-form");
    const closeRegisterModalBtn = document.getElementById("close-register-modal");
    const loginContentDiv = document.getElementById("login-content");
    const registerFormDiv = document.getElementById("register-form-inside-login");

    showRegisterFormLink?.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.style.display = "none";
        registerModal.style.display = "block";
    });

    closeRegisterModalBtn?.addEventListener("click", () => {
        registerModal.style.display = "none";
        if (loginForm.style.display === "block") {
            loginContentDiv.style.display = "block";
            registerFormDiv.style.display = "none";
        }
    });

    window.addEventListener("click", event => {
        if (event.target === registerModal) {
            registerModal.style.display = "none";
            if (loginForm.style.display === "block") {
                loginContentDiv.style.display = "block";
                registerFormDiv.style.display = "none";
            }
        }
    });

    document.querySelectorAll("#show-login-form").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            registerModal.style.display = "none";
            loginForm.style.display = "block";
            loginContentDiv.style.display = "block";
            registerFormDiv.style.display = "none";
            document.getElementById("forgot-password-content").style.display = "none";
            document.getElementById("forgot-password-dialog")?.style?.display = "none";
        });
    });
}

// ------------------------ SENHA ESQUECIDA ------------------------

function initForgotPassword() {
    const showForgotPasswordLink = document.querySelector("#login-content a[href='#']");
    const forgotPasswordDiv = document.getElementById("forgot-password-content");
    const loginContentDiv = document.getElementById("login-content");

    showForgotPasswordLink?.addEventListener("click", (e) => {
        e.preventDefault();
        loginContentDiv.style.display = "none";
        forgotPasswordDiv.style.display = "block";
    });

    document.getElementById("show-login-from-forgot")?.addEventListener("click", e => {
        e.preventDefault();
        forgotPasswordDiv.style.display = "none";
        loginContentDiv.style.display = "block";
    });
}

// ------------------------ BARRA DE PESQUISA ------------------------

function initSearchBar() {
    const searchInput = document.getElementById('search-input');
    const searchTrigger = document.getElementById('search-trigger');
    const closeSearchBtn = document.getElementById('close-search');
    const gameCards = document.querySelectorAll(".game-card");
    const gameFeaturesContainers = document.querySelectorAll(".game-features");

    const gameDescriptions = {
        'call of duty': 'Jogo de tiro em primeira pessoa com combates intensos e modos multiplayer.',
        'uncharted': 'Aventura cinematográfica com exploração, quebra-cabeças e ação.',
        'gran turismo 7': 'Simulador de corrida realista com vasta seleção de carros e pistas.',
        'minecraft': 'Jogo de mundo aberto com construção, exploração e sobrevivência.',
        'super mario bros': 'Clássico jogo de plataforma com saltos e power-ups.',
        'quebra_cabeca': 'Desafios lógicos para testar suas habilidades de raciocínio.',
    };

    searchTrigger?.addEventListener("click", () => {
        searchTrigger.style.display = 'none';
        searchInput.style.display = 'inline-block';
        closeSearchBtn.style.display = 'inline-block';
        searchInput.focus();
        gameFeaturesContainers.forEach(div => div.style.display = 'none');
        gameCards.forEach(card => card.style.display = 'flex');
        searchInput.value = '';
    });

    closeSearchBtn?.addEventListener("click", () => {
        resetSearch();
    });

    searchInput?.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();

        gameCards.forEach(card => {
            const titleElement = card.querySelector('h3');
            const featuresDiv = card.querySelector('.game-features');
            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const show = title.includes(searchTerm);

            card.style.display = show ? 'block' : 'none';

            if (featuresDiv) {
                featuresDiv.style.display = show && gameDescriptions[title] ? 'inline-block' : 'none';
                if (show && gameDescriptions[title]) {
                    featuresDiv.textContent = gameDescriptions[title];
                    featuresDiv.style.marginLeft = '15px';
                }
            }
        });

        if (searchTerm === '') resetSearch();
    });

    function resetSearch() {
        searchInput.style.display = 'none';
        closeSearchBtn.style.display = 'none';
        searchTrigger.style.display = 'inline-block';
        searchInput.value = '';
        gameCards.forEach(card => card.style.display = 'block');
        gameFeaturesContainers.forEach(div => div.style.display = 'none');
    }
}
