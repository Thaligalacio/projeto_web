document.addEventListener("DOMContentLoaded", function () {
    const categoryBtn = document.getElementById("category-btn");
    const categoryMenu = document.getElementById("category-menu");
    const gameCards = document.querySelectorAll(".game-card");
    const loginBtn = document.getElementById("login-btn");
    const loginForm = document.getElementById("login-form");
    const closeLoginModalBtn = document.getElementById("close-login-modal");
    const registerModal = document.getElementById("register-modal");
    const closeRegisterModalBtn = document.getElementById("close-register-modal");
    const loginFormDiv = document.getElementById("login-form");
    const registerFormDivInsideLogin = document.getElementById("register-form-inside-login");
    const showRegisterFormLink = document.getElementById("show-register-form");
    const showLoginFormLinks = document.querySelectorAll("#show-login-form");
    const showForgotPasswordLink = document.querySelector("#login-content a[href='#']"); // Link "Esqueci minha senha"
    const showLoginFromForgot = document.getElementById("show-login-from-forgot");
    const loginContentDiv = document.getElementById("login-content");
    const forgotPasswordDiv = document.getElementById("forgot-password-content");
    const forgotPasswordDialog = document.getElementById("forgot-password-dialog"); // Nova dialog
    const searchInput = document.getElementById('search-input');
    const searchTrigger = document.getElementById('search-trigger');
    const closeSearchBtn = document.getElementById('close-search');
    const gameFeaturesContainers = document.querySelectorAll('.game-features');
    const registerFormInsideLogin = document.getElementById("register-form-inside-login");

    //Descrições para os jogos aqui
    const gameDescriptions = {
        'call of duty':'Jogo de tiro em primeira pessoa com combates intensos e modos multiplayer.',
        'uncharted': 'Aventura cinematográfica com exploração, quebra-cabeças e ação.',
        'gran turismo 7': 'Simulador de corrida realista com vasta seleção de carros e pistas.',
        'minecraft': 'Jogo de mundo aberto com construção, exploração e sobrevivência.',
        'super mario bros': 'Clássico jogo de plataforma com saltos e power-ups.',
        'quebra_cabeca': 'Desafios lógicos para testar suas habilidades de raciocínio.',
    };

    // Dropdown categorias
    if (categoryBtn && categoryMenu) {
        categoryBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            categoryMenu.style.display = categoryMenu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function (event) {
            if (!categoryMenu.contains(event.target) && event.target !== categoryBtn) {
                categoryMenu.style.display = "none";
            }
        });
    } else {
        console.error("Botão de categoria ou menu não encontrados.");
    }

        categoryMenu.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", function () {
                const cat = this.getAttribute("data-category");
                if (cat === "all") {
                    gameCards.forEach(card => card.style.display = "flex");
                } else {
                    gameCards.forEach(card => {
                        if (card.getAttribute("data-category") === cat) {
                            card.style.display = "flex";
                        } else {
                            card.style.display = "none";
                        }
                    });
                }
                categoryMenu.querySelectorAll("li").forEach(i => i.classList.remove("active"));
                this.classList.add("active");
                categoryMenu.style.display = "none";
            });
        });
    }

    // Modal login/cadastro (abrir modal principal)
    if (loginBtn && loginForm && loginContentDiv && forgotPasswordDiv && registerFormDivInsideLogin) {
        loginBtn.addEventListener("click", () => {
            loginForm.style.display = "block";
            loginContentDiv.style.display = "block";
            forgotPasswordDiv.style.display = "none";
            if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none"; // Garante que a nova dialog esteja escondida inicialmente
            registerFormDivInsideLogin.style.display = "none";
        });
    }

    // Fechar modal de login
    if (closeLoginModalBtn && loginForm) {
        closeLoginModalBtn.addEventListener("click", () => {
            loginForm.style.display = "none";
        });
    }

    // Mostrar modal de cadastro (separado) ao clicar no link de cadastro NO LOGIN
    if (showRegisterFormLink && loginForm && registerModal) {
        showRegisterFormLink.addEventListener("click", (e) => {
            e.preventDefault();
            loginForm.style.display = "none";
            registerModal.style.display = "block";
        });
    }

    // Voltar para login do cadastro (modal separado e interno)
    function setupLoginFromRegisterLink() {
        showLoginFormLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                if (registerModal && registerModal.style.display === "block") {
                    registerModal.style.display = "none";
                    if (loginForm) loginForm.style.display = "block";
                    if (loginContentDiv) loginContentDiv.style.display = "block";
                    if (registerFormInsideLogin) registerFormDivInsideLogin.style.display = "none";
                    if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none"; // Garante que "Esqueci a senha" esteja escondido
                    if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none"; // Garante que a nova dialog esteja escondida
                } else if (loginForm && registerFormInsideLogin && loginContentDiv) {
                    registerFormInsideLogin.style.display = "none";
                    loginContentDiv.style.display = "block";
                    if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none"; // Garante que "Esqueci a senha" esteja escondido
                    if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none"; // Garante que a nova dialog esteja escondida
                } else if (loginForm && forgotPasswordDiv && loginContentDiv) {
                    forgotPasswordDiv.style.display = "none";
                    if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none"; // Garante que a nova dialog esteja escondida
                    loginContentDiv.style.display = "block"; // Volta para a tela de login normal
                } else if (loginForm && forgotPasswordDialog && loginContentDiv) {
                    forgotPasswordDialog.style.display = "none";
                    loginContentDiv.style.display = "block"; // Volta para a tela de login normal
                }
            });
        });
    }
    setupLoginFromRegisterLink();

    // Fechar modais ao clicar fora
    window.addEventListener("click", function (event) {
        if (loginForm && event.target === loginForm) {
            loginForm.style.display = "none";
            // Resetar para a tela de login principal ao fechar o modal
            if (loginContentDiv) loginContentDiv.style.display = "block";
            if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none";
            if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none";
            const loginTitleReset = document.querySelector("#login-form .modal-content.login-content h2");
            if (loginTitleReset) loginTitleReset.style.display = "block";
        }
        if (registerModal && event.target === registerModal) {
            registerModal.style.display = "none";
            // Ao fechar o modal de registro, volta a mostrar o formulário de login se o modal de login estiver aberto
            if (loginForm && loginForm.style.display === "block") {
                if (loginContentDiv) loginContentDiv.style.display = "block";
                if (registerFormDivInsideLogin) registerFormDivInsideLogin.style.display = "none";
            }
        }
    });

    // Fechar modal de cadastro (separado) no botão de fechar
    if (closeRegisterModalBtn && registerModal) {
        closeRegisterModalBtn.addEventListener("click", () => {
            registerModal.style.display = "none";
            // Ao fechar o modal de registro, volta a mostrar o formulário de login se o modal de login estiver aberto
            if (loginForm && loginForm.style.display === "block") {
                if (loginContentDiv) loginContentDiv.style.display = "block";
                if (registerFormDivInsideLogin) registerFormDivInsideLogin.style.display = "none";
            }
        });
    }

    // Funcionalidade da barra de pesquisa e exibição das características
    if (searchTrigger && searchInput && closeSearchBtn) {
        searchTrigger.addEventListener('click', function() {
            searchTrigger.style.display = 'none';
            searchInput.style.display = 'inline-block';
            closeSearchBtn.style.display = 'inline-block';
            searchInput.focus();
            gameFeaturesContainers.forEach(div => div.style.display = 'none');
            gameCards.forEach(card => card.style.display = 'flex');
            searchInput.value = '';
        });

        closeSearchBtn.addEventListener('click', function() {
            searchInput.style.display = 'none';
            closeSearchBtn.style.display = 'none';
            searchTrigger.style.display = 'inline-block';
            searchInput.value = '';
            gameCards.forEach(card => card.style.display = 'flex');
            gameFeaturesContainers.forEach(div => div.style.display = 'none');
        });

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            gameCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                const featuresDiv = card.querySelector('.game-features');
                const title = titleElement ? titleElement.textContent.toLowerCase() : '';

                if (title.includes(searchTerm)) {
                    card.style.display = 'block'; // Mantém a forma de exibição original
                    if (featuresDiv && gameDescriptions[title]) {
                        featuresDiv.textContent = gameDescriptions[title];
                        featuresDiv.style.display = 'inline-block';
                        featuresDiv.style.verticalAlign = 'top';
                        featuresDiv.style.marginLeft = '15px';
                    } else if (featuresDiv) {
                        featuresDiv.style.display = 'none';
                    }
                } else {
                    card.style.display = 'none';
                    if (featuresDiv) {
                        featuresDiv.style.display = 'none';
                    }
                }

                if (searchTerm === '') {
                    card.style.display = 'block';
                    if (featuresDiv) {
                        featuresDiv.style.display = 'none';
                    }
                }
            });
        });
    }
});