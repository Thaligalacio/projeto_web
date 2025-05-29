console.log("Arquivo script.js carregado!");

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
    initCategoryDropdown();
    initCategoryFilter();
    initLoginModal();
    initRegisterModal();
    initForgotPassword();
    initSearchBar();
});

// ------------------------ CATEGORIAS ------------------------

// Controla o botão de dropdown de categorias
function initCategoryDropdown() {
    const categoryBtn = document.getElementById("category-btn");
    const dropdown = categoryBtn?.parentElement;

    categoryBtn?.addEventListener("click", () => {
        dropdown.classList.toggle("show");
    });

    // Fecha o menu se clicar fora dele
    document.addEventListener("click", event => {
        if (!dropdown.contains(event.target) && event.target !== categoryBtn) {
            dropdown.classList.remove("show");
        }
    });
}

// Filtra os jogos ao clicar nas categorias
function initCategoryFilter() {
    const categoryLinks = document.querySelectorAll("#category-menu a");
    const gameCards = document.querySelectorAll(".game-card");

    categoryLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const categoria = normalizeCategory(link.textContent);
            filterGamesByCategory(categoria);
            document.getElementById("category-btn").parentElement.classList.remove("show");
        });
    });

    function normalizeCategory(text) {
        return text.toLowerCase().replace("ç", "c").replace(" ", "_");
    }

    function filterGamesByCategory(categoria) {
        gameCards.forEach(card => {
            const categoriaCard = card.getAttribute("data-category");
            card.style.display = (categoria === "menu_principal" || categoriaCard === categoria) ? "block" : "none";
        });
    }
}

// ------------------------ LOGIN ------------------------

function initLoginModal() {
    const loginBtn = document.getElementById("login-btn");
    console.log("Botão de Login:", loginBtn);
    const loginForm = document.getElementById("login-form");
    const closeBtn = document.getElementById("close-login-modal");
    const loginContent = document.getElementById("login-content");
    const registerForm = document.getElementById("register-form-inside-login");
    const forgotPassword = document.getElementById("forgot-password-content");
    const forgotDialog = document.getElementById("forgot-password-dialog");

    loginBtn?.addEventListener("click", showLoginForm);
    closeBtn?.addEventListener("click", () => loginForm.style.display = "none");

    // Fecha o modal ao clicar fora
    window.addEventListener("click", event => {
        if (event.target === loginForm) {
            hideLoginSections();
            loginForm.style.display = "none";
        }
    });

function showLoginForm() {
    console.log("Botão de Login clicado!");
    console.log("Elemento loginForm:", loginForm);
    console.log("Display atual de loginForm:", loginForm?.style.display);
    loginForm.style.display = "block";
    loginContent.style.display = "block";
    registerForm.style.display = "none";
    forgotPassword.style.display = "none";

}

    function hideLoginSections() {
        loginContent.style.display = "block";
        forgotPassword.style.display = "none";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    console.log("Botão de Login:", loginBtn);
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {

        });
    } else {
        console.log("Botão de Login não encontrado!");
    }
});

// ------------------------ CADASTRO ------------------------

function initRegisterModal() {
    const showRegister = document.getElementById("show-register-form");
    const registerModal = document.getElementById("register-modal");
    const loginForm = document.getElementById("login-form");
    const closeBtn = document.getElementById("close-register-modal");
    const loginContent = document.getElementById("login-content");
    const registerForm = document.getElementById("register-form-inside-login");

    showRegister?.addEventListener("click", e => {
        e.preventDefault();
        loginForm.style.display = "none";
        registerModal.style.display = "block";
    });

    closeBtn?.addEventListener("click", () => {
        registerModal.style.display = "none";
        if (loginForm.style.display === "block") {
            loginContent.style.display = "block";
            registerForm.style.display = "none";
        }
    });

    window.addEventListener("click", event => {
        if (event.target === registerModal) {
            registerModal.style.display = "none";
            if (loginForm.style.display === "block") {
                loginContent.style.display = "block";
                registerForm.style.display = "none";
            }
        }
    });

    // Alterna para o formulário de login a partir do modal de cadastro
    document.querySelectorAll("#show-login-form").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            registerModal.style.display = "none";
            loginForm.style.display = "block";
            loginContent.style.display = "block";
            registerForm.style.display = "none";
            document.getElementById("forgot-password-content").style.display = "none";
        });
    });
}

// ------------------------ SENHA ESQUECIDA ------------------------

function initForgotPassword() {
    const forgotLink = document.querySelector("#login-content a[href='#']");
    const forgotContent = document.getElementById("forgot-password-content");
    const loginContent = document.getElementById("login-content");

    forgotLink?.addEventListener("click", e => {
        e.preventDefault();
        loginContent.style.display = "none";
        forgotContent.style.display = "block";
    });

    document.getElementById("show-login-from-forgot")?.addEventListener("click", e => {
        e.preventDefault();
        forgotContent.style.display = "none";
        loginContent.style.display = "block";
    });
}

// ------------------------ BARRA DE PESQUISA ------------------------

function initSearchBar() {
    const searchInput = document.getElementById('search-input');
    const searchTrigger = document.getElementById('search-trigger');
    const closeSearchBtn = document.getElementById('close-search');
    const gameCards = document.querySelectorAll(".game-card");
    const featureBoxes = document.querySelectorAll(".game-features");

    // Dicionário de descrições
    const descriptions = {
        'call of duty': 'Jogo de tiro em primeira pessoa com combates intensos e modos multiplayer.',
        'uncharted': 'Aventura cinematográfica com exploração, quebra-cabeças e ação.',
        'gran turismo 7': 'Simulador de corrida realista com vasta seleção de carros e pistas.',
        'minecraft': 'Jogo de mundo aberto com construção, exploração e sobrevivência.',
        'super mario bros': 'Clássico jogo de plataforma com saltos e power-ups.',
        'quebra_cabeca': 'Desafios lógicos para testar suas habilidades de raciocínio.',
    };

    // Abre a barra de busca
    searchTrigger?.addEventListener("click", () => {
        toggleSearch(true);
    });

    // Fecha a barra de busca
    closeSearchBtn?.addEventListener("click", () => {
        toggleSearch(false);
    });

    // Filtro de busca ao digitar
    searchInput?.addEventListener("input", function () {
        const term = this.value.toLowerCase();

        gameCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const featuresDiv = card.querySelector('.game-features');
            const matches = title.includes(term);

            // Mostra ou oculta o card conforme a busca
            card.style.display = matches ? 'block' : 'none';

            // Exibe descrição se existir
            if (featuresDiv) {
                if (matches && descriptions[title]) {
                    featuresDiv.textContent = descriptions[title];
                    featuresDiv.style.display = 'inline-block';
                    featuresDiv.style.marginLeft = '15px';
                } else {
                    featuresDiv.style.display = 'none';
                }
            }
        });

        if (term === '') toggleSearch(false);
    });

    // Alterna visibilidade dos controles de busca
    function toggleSearch(show) {
        searchTrigger.style.display = show ? 'none' : 'inline-block';
        searchInput.style.display = show ? 'inline-block' : 'none';
        closeSearchBtn.style.display = show ? 'inline-block' : 'none';
        searchInput.value = '';
        gameCards.forEach(card => card.style.display = 'block');
        featureBoxes.forEach(div => div.style.display = 'none');
        if (show) searchInput.focus();
    }
}
