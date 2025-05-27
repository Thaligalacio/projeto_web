console.log("Arquivo script.js carregado!");

document.addEventListener("DOMContentLoaded", function () {
    // Elementos do DOM
    
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
    const showForgotPasswordLink = document.querySelector("#login-content a[href='#']");
    const showLoginFromForgot = document.getElementById("show-login-from-forgot");
    const loginContentDiv = document.getElementById("login-content");
    const forgotPasswordDiv = document.getElementById("forgot-password-content");
    const forgotPasswordDialog = document.getElementById("forgot-password-dialog");
    const searchInput = document.getElementById('search-input');
    const searchTrigger = document.getElementById('search-trigger');
    const closeSearchBtn = document.getElementById('close-search');
    const gameFeaturesContainers = document.querySelectorAll('.game-features');
    const registerFormInsideLoginElement = document.getElementById("register-form-inside-login"); // Para evitar repetição no nome da variável

    // Descrições dos jogos
    const gameDescriptions = {
        'call of duty': 'Jogo de tiro em primeira pessoa com combates intensos e modos multiplayer.',
        'uncharted': 'Aventura cinematográfica com exploração, quebra-cabeças e ação.',
        'gran turismo 7': 'Simulador de corrida realista com vasta seleção de carros e pistas.',
        'minecraft': 'Jogo de mundo aberto com construção, exploração e sobrevivência.',
        'super mario bros': 'Clássico jogo de plataforma com saltos e power-ups.',
        'quebra_cabeca': 'Desafios lógicos para testar suas habilidades de raciocínio.',
    };

    // Funcionalidade do Dropdown de Categorias
    if (categoryBtn && categoryMenu) {
        categoryBtn.addEventListener("click", function (event) {
            console.log("Botão de categoria ACIONADO!");
            event.stopPropagation();
            categoryMenu.classList.toggle("menu-aberto");
            console.log("Classe 'menu-aberto' aplicada:", categoryMenu.classList.contains("menu-aberto"));
            console.log("Display ANTES:", categoryMenu.style.display);
            event.stopPropagation();
            categoryMenu.style.display = categoryMenu.style.display === "block" ? "none" : "block";
            console.log("Display DEPOIS:", categoryMenu.style.display);
        });

        //document.addEventListener("click", function (event) {
        //    if (!categoryMenu.contains(event.target) && event.target !== categoryBtn) {
        //        categoryMenu.style.display = "none";
        //    }
        //});

        categoryMenu.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", function () {
                const category = this.getAttribute("data-category");
                gameCards.forEach(card => {
                    card.style.display = category === "all" || card.getAttribute("data-category") === category ? "flex" : "none";
                });
                categoryMenu.querySelectorAll("li").forEach(item => item.classList.remove("active"));
                this.classList.add("active");
                categoryMenu.style.display = "none";
            });
        });
    } else {
        console.error("Botão de categoria ou menu não encontrados.");
    }

    // Modal de Login/Cadastro
    if (loginBtn && loginForm && loginContentDiv && forgotPasswordDiv && registerFormDivInsideLogin) {
        loginBtn.addEventListener("click", () => {
            loginForm.style.display = "block";
            loginContentDiv.style.display = "block";
            forgotPasswordDiv.style.display = "none";
            if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none";
            registerFormDivInsideLogin.style.display = "none";
        });
    }

    if (closeLoginModalBtn && loginForm) {
        closeLoginModalBtn.addEventListener("click", () => {
            loginForm.style.display = "none";
        });
    }

    if (showRegisterFormLink && loginForm && registerModal) {
        showRegisterFormLink.addEventListener("click", (e) => {
            e.preventDefault();
            loginForm.style.display = "none";
            registerModal.style.display = "block";
        });
    }

    function setupLoginFromRegisterLink() {
        showLoginFormLinks.forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                if (registerModal && registerModal.style.display === "block") {
                    registerModal.style.display = "none";
                    if (loginForm) loginForm.style.display = "block";
                    if (loginContentDiv) loginContentDiv.style.display = "block";
                    if (registerFormDivInsideLogin) registerFormDivInsideLogin.style.display = "none";
                    if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none";
                    if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none";
                } else if (loginForm && registerFormDivInsideLogin && loginContentDiv) {
                    registerFormDivInsideLogin.style.display = "none";
                    loginContentDiv.style.display = "block";
                    if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none";
                    if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none";
                } else if (loginForm && forgotPasswordDiv && loginContentDiv) {
                    forgotPasswordDiv.style.display = "none";
                    if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none";
                    loginContentDiv.style.display = "block";
                } else if (loginForm && forgotPasswordDialog && loginContentDiv) {
                    forgotPasswordDialog.style.display = "none";
                    loginContentDiv.style.display = "block";
                }
            });
        });
    }
    setupLoginFromRegisterLink();

    window.addEventListener("click", function (event) {
        if (loginForm && event.target === loginForm) {
            loginForm.style.display = "none";
            if (loginContentDiv) loginContentDiv.style.display = "block";
            if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none";
            if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none";
            const loginTitleReset = document.querySelector("#login-form .modal-content.login-content h2");
            if (loginTitleReset) loginTitleReset.style.display = "block";
        }
        if (registerModal && event.target === registerModal) {
            registerModal.style.display = "none";
            if (loginForm && loginForm.style.display === "block") {
                if (loginContentDiv) loginContentDiv.style.display = "block";
                if (registerFormDivInsideLogin) registerFormDivInsideLogin.style.display = "none";
            }
        }
    });

    if (closeRegisterModalBtn && registerModal) {
        closeRegisterModalBtn.addEventListener("click", () => {
            registerModal.style.display = "none";
            if (loginForm && loginForm.style.display === "block") {
                if (loginContentDiv) loginContentDiv.style.display = "block";
                if (registerFormDivInsideLogin) registerFormDivInsideLogin.style.display = "none";
            }
        });
    }

    // Funcionalidade da Barra de Pesquisa
    if (searchTrigger && searchInput && closeSearchBtn) {
        searchTrigger.addEventListener('click', function () {
            searchTrigger.style.display = 'none';
            searchInput.style.display = 'inline-block';
            closeSearchBtn.style.display = 'inline-block';
            searchInput.focus();
            gameFeaturesContainers.forEach(div => div.style.display = 'none');
            gameCards.forEach(card => card.style.display = 'flex');
            searchInput.value = '';
        });

        closeSearchBtn.addEventListener('click', function () {
            searchInput.style.display = 'none';
            closeSearchBtn.style.display = 'none';
            searchTrigger.style.display = 'inline-block';
            searchInput.value = '';
            gameCards.forEach(card => card.style.display = 'flex');
            gameFeaturesContainers.forEach(div => div.style.display = 'none');
        });

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            gameCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                const featuresDiv = card.querySelector('.game-features');
                const title = titleElement ? titleElement.textContent.toLowerCase() : '';

                const shouldShow = title.includes(searchTerm);
                card.style.display = shouldShow ? 'block' : 'none';

                if (featuresDiv) {
                    featuresDiv.style.display = shouldShow && gameDescriptions[title] ? 'inline-block' : 'none';
                    if (shouldShow && gameDescriptions[title]) {
                        featuresDiv.textContent = gameDescriptions[title];
                        featuresDiv.style.verticalAlign = 'top';
                        featuresDiv.style.marginLeft = '15px';
                    }
                }
            });

            if (searchTerm === '') {
                gameCards.forEach(card => {
                    card.style.display = 'block';
                    const featuresDiv = card.querySelector('.game-features');
                    if (featuresDiv) featuresDiv.style.display = 'none';
                });
            }
        });
    }
});