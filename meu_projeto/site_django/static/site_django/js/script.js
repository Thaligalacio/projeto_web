console.log("Arquivo script.js carregado!");

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
    initCategoryDropdown();
    initCategoryFilter();
    initLoginModal();
    initRegisterModal(); // Chamada para o modal de registro separado
    initForgotPassword();
    initSearchBar();
    initCarousel(); // Adiciona a inicialização do carrossel
    initDjangoMessages(); // Função para lidar com as mensagens do Django
});

// ------------------------ MENSAGENS POPUP (Django Messages) ------------------------
function initDjangoMessages() {
    const messageDivs = document.querySelectorAll('.django-message-popup');

    messageDivs.forEach((messageDiv) => {
        // Garante que a div esteja visível antes de adicionar a classe 'show'
        // Definir display: 'block' e forçar reflow é essencial para a transição
        messageDiv.style.display = 'block';
        void messageDiv.offsetWidth; // Força o reflow

        messageDiv.classList.add('show'); // Adiciona a classe para animação de entrada

        // Define um timeout para esconder a mensagem
        setTimeout(() => {
            messageDiv.classList.remove('show'); // Remove a classe para animação de saída
            // Espera a transição terminar antes de ocultar totalmente
            messageDiv.addEventListener('transitionend', function handler() {
                messageDiv.style.display = 'none';
                messageDiv.removeEventListener('transitionend', handler); // Remove o listener após uso
            });

            // Lógica para fechar modais se a mensagem for de sucesso de cadastro
            if (messageDiv.classList.contains('success')) {
                const registerModal = document.getElementById('register-modal');
                if (registerModal && registerModal.style.display === 'block') {
                    registerModal.style.display = 'none';
                }
                const loginModal = document.getElementById('login-form');
                if (loginModal && loginModal.style.display === 'block') {
                    loginModal.style.display = 'none';
                }
            }
        }, 5000); // Exibe por 5 segundos
    });
}


// ------------------------ CARROSSEL ------------------------
// ------------------------ CARROSSEL ------------------------
function initCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    if (!carouselSlide) {
        console.warn("Elemento .carousel-slide não encontrado. Carrossel não inicializado.");
        return;
    }
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length; // Deve ser 5 no seu caso
    let currentIndex = 0;

    function moveSlide(index) {
        // Lógica para loop infinito
        if (index >= totalItems) {
            currentIndex = 0; // Volta para o primeiro slide
        } else if (index < 0) {
            currentIndex = totalItems - 1; // Vai para o último slide
        } else {
            currentIndex = index;
        }

        // Calcula o deslocamento. Cada slide ocupa 100% da largura visível do carousel-container.
        // Então, você multiplica o índice pelo 100% do tamanho do item.
        carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    // Função para avançar o slide automaticamente
    function nextSlide() {
        moveSlide(currentIndex + 1);
    }

    // Inicia o carrossel automático
    setInterval(nextSlide, 8000); // Muda de slide a cada 8 segundos

}

// ------------------------ CATEGORIAS ------------------------

// Controla o botão de dropdown de categorias
function initCategoryDropdown() {
    const categoryBtn = document.getElementById("category-btn");
    const dropdown = categoryBtn?.parentElement;

    if (!categoryBtn || !dropdown) {
        console.warn("Elementos do dropdown de categoria não encontrados.");
        return;
    }

    categoryBtn.addEventListener("click", () => {
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

    if (categoryLinks.length === 0 || gameCards.length === 0) {
        console.warn("Elementos para filtro de categoria não encontrados.");
        return;
    }

    categoryLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const categoria = normalizeCategory(link.textContent);
            filterGamesByCategory(categoria);
            // Fechar o dropdown após a seleção
            const dropdown = document.getElementById("category-btn")?.parentElement;
            if (dropdown) {
                dropdown.classList.remove("show");
            }
        });
    });

    function normalizeCategory(text) {
        // Transforma o texto do link para bater com o data-category do card
        return text.toLowerCase().replace("ç", "c").replace(" ", "_");
    }

    function filterGamesByCategory(categoria) {
        gameCards.forEach(card => {
            const categoriaCard = card.getAttribute("data-category");
            if (categoria === "menu_principal") { // Se for "Menu Principal", mostra todos
                card.style.display = "block";
            } else if (categoriaCard === categoria) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
}

// ------------------------ LOGIN ------------------------

function initLoginModal() {
    const loginBtn = document.getElementById("login-btn");
    const loginModal = document.getElementById("login-form");
    const closeLoginBtn = document.getElementById("close-login-modal");
    const loginContent = document.getElementById("login-content");
    const registerFormInsideLogin = document.getElementById("register-form-inside-login");
    const showRegisterFormLink = document.getElementById("show-register-form");
    const showLoginFromRegisterLink = document.getElementById("show-login-form"); // Link "Fazer Login" dentro do form de registro
    const forgotPasswordLink = loginContent?.querySelector('.options a[href="#"]'); // Link "Esqueci minha senha"

    if (!loginBtn || !loginModal || !closeLoginBtn || !loginContent || !registerFormInsideLogin) {
        console.warn("Elementos essenciais para o modal de login não encontrados.");
        return;
    }

    // Abre o modal de login
    loginBtn.addEventListener("click", () => {
        loginModal.style.display = "block";
        loginContent.style.display = "block"; // Garante que o login esteja visível
        registerFormInsideLogin.style.display = "none"; // Garante que o registro esteja oculto
        document.getElementById('forgot-password-content').style.display = "none"; // Oculta esqueci senha também
    });

    // Fecha o modal de login
    closeLoginBtn.addEventListener("click", () => {
        loginModal.style.display = "none";
        hideAllLoginSubsections(); // Oculta todas as subseções internas ao fechar o modal
    });

    // Fecha o modal ao clicar fora
    window.addEventListener("click", event => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
            hideAllLoginSubsections();
        }
    });

    // Mostrar formulário de registro dentro do modal de login
    showRegisterFormLink?.addEventListener("click", (event) => {
        event.preventDefault();
        loginContent.style.display = "none";
        registerFormInsideLogin.style.display = "block";
    });

    // Voltar para o formulário de login (do registro interno)
    showLoginFromRegisterLink?.addEventListener("click", (event) => {
        event.preventDefault();
        loginContent.style.display = "block";
        registerFormInsideLogin.style.display = "none";
    });

    // Mostrar formulário de "Esqueci minha senha"
    forgotPasswordLink?.addEventListener("click", (event) => {
        event.preventDefault();
        loginContent.style.display = "none";
        document.getElementById('forgot-password-content').style.display = "block";
    });

    // Função auxiliar para ocultar todas as sub-seções ao fechar o modal de login
    function hideAllLoginSubsections() {
        loginContent.style.display = "block"; // Volta para a seção de login por padrão
        registerFormInsideLogin.style.display = "none";
        document.getElementById('forgot-password-content').style.display = "none";
    }
}


// ------------------------ REGISTRO MODAL (SEPARADO) ------------------------

function initRegisterModal() {
    const registerModal = document.getElementById("register-modal");
    const closeRegisterBtn = document.getElementById("close-register-modal");
    const showLoginFromRegisterModalLink = registerModal?.querySelector('.signup-link a[href="#"]#show-login-form');


    if (!registerModal || !closeRegisterBtn) {
        console.warn("Elementos essenciais para o modal de registro (separado) não encontrados.");
        return;
    }

    closeRegisterBtn.addEventListener("click", () => {
        registerModal.style.display = "none";
    });

    window.addEventListener("click", event => {
        if (event.target === registerModal) {
            registerModal.style.display = "none";
        }
    });

    // Se o modal de registro separado for aberto, e o usuário clicar em "Fazer Login"
    showLoginFromRegisterModalLink?.addEventListener('click', (event) => {
        event.preventDefault();
        registerModal.style.display = 'none'; // Fecha o modal de registro
        document.getElementById('login-form').style.display = 'block'; // Abre o modal de login
        document.getElementById('login-content').style.display = 'block'; // Mostra a parte de login
        document.getElementById('register-form-inside-login').style.display = 'none'; // Esconde a parte de registro interna
    });
}

// ------------------------ ESQUECI SENHA ------------------------
function initForgotPassword() {
    const forgotPasswordContent = document.getElementById("forgot-password-content");
    const closeForgotPasswordBtn = document.getElementById("close-forgot-password-modal");
    const showLoginFromForgotLink = document.getElementById("show-login-from-forgot");
    const recoverPasswordButton = document.getElementById("recover-password-button");

    if (!forgotPasswordContent) {
        console.warn("Elemento 'forgot-password-content' não encontrado.");
        return;
    }

    closeForgotPasswordBtn?.addEventListener("click", () => {
        forgotPasswordContent.style.display = "none";
        // Opcional: mostrar o modal de login novamente se ele estava aberto
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('login-content').style.display = 'block';
    });

    showLoginFromForgotLink?.addEventListener("click", (event) => {
        event.preventDefault();
        forgotPasswordContent.style.display = "none";
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('login-content').style.display = 'block';
    });

    recoverPasswordButton?.addEventListener("click", () => {
        alert("Funcionalidade de recuperação de senha ainda não implementada.");
        // Aqui você adicionaria a lógica para enviar o email de recuperação
    });
}

// ------------------------ BARRA DE PESQUISA ------------------------
function initSearchBar() {
    const searchTrigger = document.getElementById("search-trigger");
    const searchInput = document.getElementById("search-input");
    const closeSearchBtn = document.getElementById("close-search");
    const gameCards = document.querySelectorAll(".game-card");

    if (!searchTrigger || !searchInput || !closeSearchBtn || gameCards.length === 0) {
        console.warn("Elementos para barra de pesquisa não encontrados.");
        return;
    }

    searchTrigger.addEventListener("click", () => {
        searchInput.style.display = "block";
        closeSearchBtn.style.display = "inline-block";
        searchTrigger.style.display = "none"; // Esconde o botão "Procurar"
        searchInput.focus();
    });

    closeSearchBtn.addEventListener("click", () => {
        searchInput.style.display = "none";
        closeSearchBtn.style.display = "none";
        searchTrigger.style.display = "inline-block"; // Mostra o botão "Procurar"
        searchInput.value = ''; // Limpa o campo de busca
        filterGamesByName(''); // Reseta o filtro
    });

    searchInput.addEventListener("keyup", () => {
        filterGamesByName(searchInput.value);
    });

    function filterGamesByName(searchText) {
        const lowerCaseSearchText = searchText.toLowerCase();
        gameCards.forEach(card => {
            const gameName = card.querySelector("h3")?.textContent.toLowerCase() || "";
            if (gameName.includes(lowerCaseSearchText) || lowerCaseSearchText === '') {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
}
