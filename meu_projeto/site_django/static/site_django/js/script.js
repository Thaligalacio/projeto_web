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


    // Dropdown categorias
    if (categoryBtn) {
        categoryBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            categoryMenu.style.display = categoryMenu.style.display === "block" ? "none" : "block";
        });
    }
    document.addEventListener("click", function (e) {
        if (categoryMenu && !categoryMenu.contains(e.target) && e.target !== categoryBtn) {
            categoryMenu.style.display = "none";
        }
    });
    if (categoryMenu) {
        categoryMenu.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", function () {
                const cat = this.getAttribute("data-category");
                if (cat === "all") {
                    gameCards.forEach(card => card.style.display = "block");
                } else {
                    gameCards.forEach(card => {
                        if (card.getAttribute("data-category") === cat) {
                            card.style.display = "block";
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
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (loginForm) loginForm.style.display = "block";
            if (loginContentDiv) loginContentDiv.style.display = "block";
            if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none";
            if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none"; // Garante que a nova dialog esteja escondida inicialmente
            if (registerFormDivInsideLogin) registerFormDivInsideLogin.style.display = "none";
        });
    }
    if (closeLoginModalBtn && loginForm) {
        closeLoginModalBtn.addEventListener("click", () => {
            loginForm.style.display = "none";
        });
    }

    // Mostrar modal de cadastro (separado) ao clicar no link de cadastro NO LOGIN
    if (showRegisterFormLink) {
        showRegisterFormLink.addEventListener("click", (e) => {
            e.preventDefault();
            if (loginForm) loginForm.style.display = "none";
            if (registerModal) registerModal.style.display = "block";
        });
    }

    // Voltar para login do cadastro (modal separado e interno)
    function setupLoginFromRegisterLink() {
        showLoginFormLinks.forEach(link => {
            console.log("Link 'Fazer Login' encontrado:", link);
            link.addEventListener("click", function(e) {
                e.preventDefault();
                console.log("CLIQUE NO 'FAZER LOGIN' DETECTADO!");
                if (registerModal && registerModal.style.display === "block") {
                    registerModal.style.display = "none";
                    if (loginForm) loginForm.style.display = "block";
                    if (loginContentDiv) loginContentDiv.style.display = "block";
                    if (registerFormInsideLogin) registerFormDivInsideLogin.style.display = "none";
                    if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none"; // Garante que "Esqueci a senha" esteja escondido
                    if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none"; // Garante que a nova dialog esteja escondida
                    console.log("Trocando do modal de cadastro (separado) para login.");
                } else if (loginForm && registerFormInsideLogin && loginContentDiv) {
                    registerFormDivInsideLogin.style.display = "none";
                    loginContentDiv.style.display = "block";
                    if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none"; // Garante que "Esqueci a senha" esteja escondido
                    if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none"; // Garante que a nova dialog esteja escondida
                    console.log("Trocando da aba de cadastro (dentro do login) para login.");
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

    // Mostrar formulário esqueci a senha (dentro do modal de login principal)
    const loginTitle = document.querySelector("#login-form .modal-content.login-content h2"); // Seleciona o título de login

    if (showForgotPasswordLink) {
        showForgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();

            if (loginContentDiv) {
                loginContentDiv.style.display = "none";
                console.log("Escondendo a seção de login.");
            }
            if (forgotPasswordDiv) {
                forgotPasswordDiv.style.display = "none"; // Esconde a versão antiga
                console.log("Escondendo a seção antiga de 'Esqueci minha senha'.");
            }
            if (forgotPasswordDialog) {
                forgotPasswordDialog.style.display = "block"; // Mostra a nova dialog
                console.log("Mostrando a nova caixa de diálogo de 'Esqueci minha senha'.");
            }
            if (loginTitle) {
                loginTitle.style.display = "none"; // Esconde o título de login
                console.log("Escondendo o título de login.");
            }
            // O botão de fechar permanece visível, o que é bom para fechar o modal.
        });
    }

    // Voltar para login do esqueci senha (dentro da NOVA dialog)
    const backToLoginNewDialog = document.querySelector("#forgot-password-dialog .back-to-login a");
    if (backToLoginNewDialog) {
        backToLoginNewDialog.addEventListener("click", function(e) {
            e.preventDefault();
            if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none";
            if (loginContentDiv) loginContentDiv.style.display = "block";
            if (loginTitle) loginTitle.style.display = "block";
        });
    }

    // Voltar para login do esqueci senha (dentro do MODAL ANTIGO) - mantido por precaução
    if (showLoginFromForgot) {
        showLoginFromForgot.addEventListener("click", (e) => {
            e.preventDefault();
            if (loginContentDiv) loginContentDiv.style.display = "block";
            if (forgotPasswordDiv) forgotPasswordDiv.style.display = "none";
            if (forgotPasswordDialog) forgotPasswordDialog.style.display = "none"; // Garante que a nova dialog também esteja escondida
            if (loginTitle) loginTitle.style.display = "block";
        });
    }

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
    if (closeRegisterModalBtn) {
        closeRegisterModalBtn.addEventListener("click", () => {
            registerModal.style.display = "none";
            // Ao fechar o modal de registro, volta a mostrar o formulário de login se o modal de login estiver aberto
            if (loginForm && loginForm.style.display === "block") {
                if (loginContentDiv) loginContentDiv.style.display = "block";
                if (registerFormDivInsideLogin) registerFormDivInsideLogin.style.display = "none";
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (seu código JavaScript existente) ...

    const searchTrigger = document.getElementById('search-trigger');
    const searchInput = document.getElementById('search-input');
    const closeSearchBtn = document.getElementById('close-search');
    const gameCards = document.querySelectorAll('.game-card');

    if (searchTrigger) {
        searchTrigger.addEventListener('click', function() {
            searchTrigger.style.display = 'none';
            searchInput.style.display = 'inline-block';
            closeSearchBtn.style.display = 'inline-block';
            searchInput.focus();
        });
    }

    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', function() {
            searchInput.style.display = 'none';
            closeSearchBtn.style.display = 'none';
            searchTrigger.style.display = 'inline-block';
            // Opcional: Limpar o campo de pesquisa ao fechar
            searchInput.value = '';
            // Opcional: Mostrar todos os jogos novamente
            gameCards.forEach(card => card.style.display = 'block');
        });
    }

    // Funcionalidade de pesquisa enquanto digita
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        gameCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // ... (o restante do seu código JavaScript) ...
});