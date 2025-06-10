console.log("Arquivo script.js carregado!");

// Função para centralizar o controle de todos os modais
const modalController = (() => {
    const modals = {
        'login-form': {
            element: document.getElementById('login-form'),
            content: document.getElementById('login-content'), // Conteúdo principal do login
            registerContent: document.getElementById('register-form-inside-login'), // Form de registro dentro do login
            forgotContent: document.getElementById('forgot-password-content'), // Form de esqueci senha
            loginTitle: document.getElementById('login-title') // ADICIONE ESTA LINHA AQUI
        },
        'register-modal': { // Assumindo que este é o modal de registro separado
            element: document.getElementById('register-modal'),
            content: null // Não há sub-seções aqui, o próprio modal é o conteúdo
        },
        'lgpd-modal': { // ADICIONE ESTE MODAL AO CONTROLADOR
            element: document.getElementById('lgpd-modal'),
            content: null // Não há sub-conteúdo complexo para o LGPD
        }
    };

    function openModal(modalId, initialSection = 'main') {
        const modal = modals[modalId];
        if (!modal || !modal.element) {
            console.warn(`Modal com ID '${modalId}' não encontrado.`);
            return;
        }

        // Fecha todos os outros modais abertos antes de abrir o novo
        for (const key in modals) {
            if (modals[key].element && modals[key].element.classList.contains('show')) {
                closeModal(key);
            }
        }

        // Adiciona a classe 'show' para ativar o display: flex e centralização via CSS
        modal.element.classList.add('show');
        document.body.classList.add('modal-open'); // Desabilita o scroll do body

        // Controla as sub-seções do modal de login
        if (modalId === 'login-form') {
            if (initialSection === 'register' && modal.registerContent) {
                modal.content.style.display = 'none';
                modal.registerContent.style.display = 'block';
                if (modal.forgotContent) modal.forgotContent.style.display = 'none';
                if (modal.loginTitle) modal.loginTitle.style.display = 'none'; // OCULTA O TÍTULO "FAÇA O SEU LOGIN"
            } else if (initialSection === 'forgot' && modal.forgotContent) {
                modal.content.style.display = 'none';
                modal.forgotContent.style.display = 'block';
                if (modal.registerContent) modal.registerContent.style.display = 'none';
                if (modal.loginTitle) modal.loginTitle.style.display = 'none'; // OCULTA O TÍTULO "FAÇA O SEU LOGIN"
            } else { // Padrão: main login
                modal.content.style.display = 'block';
                if (modal.registerContent) modal.registerContent.style.display = 'none';
                if (modal.forgotContent) modal.forgotContent.style.display = 'none';
                if (modal.loginTitle) modal.loginTitle.style.display = 'block'; // MOSTRA O TÍTULO "FAÇA O SEU LOGIN"
            }
        }
    }

    function closeModal(modalId) {
        const modal = modals[modalId];
        if (modal && modal.element) {
            // Remove a classe 'show' para esconder o modal
            modal.element.classList.remove('show');
            document.body.classList.remove('modal-open'); // Habilita o scroll do body

            // Reseta a exibição das sub-seções do login ao fechar
            if (modalId === 'login-form' && modal.content) {
                modal.content.style.display = 'block';
                if (modal.registerContent) modal.registerContent.style.display = 'none';
                if (modal.forgotContent) modal.forgotContent.style.display = 'none';
                if (modal.loginTitle) modal.loginTitle.style.display = 'block'; // Garante que o título volte ao fechar
            }
        }
    }

    // Fecha qualquer modal clicando fora dele
    window.addEventListener('click', (event) => {
        for (const key in modals) {
            const modalElement = modals[key].element;
            // Verifica se o modal está aberto (tem a classe 'show') e se o clique foi fora do conteúdo do modal
            // E garante que não é o modal da LGPD que está sendo fechado por clique fora (normalmente LGPD exige ação explícita)
            if (modalElement && modalElement.classList.contains('show') && event.target === modalElement && key !== 'lgpd-modal') {
                closeModal(key);
            }
        }
    });

    return {
        open: openModal,
        close: closeModal
    };
})();

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
    initCategoryDropdown();
    initCategoryFilter();
    initModals(); // Agora uma única função para todos os modais
    initSearchBar();
    initCarousel();
    initDjangoMessages();
    initGameCardHoverDescriptions(); // Nova função para a descrição lateral no hover
    initLoginFormHandler(); // NOVO: Inicializa o manipulador do formulário de login

    // Garante que todos os jogos sejam exibidos na carga inicial da página
    filterGamesByCategory("menu_principal");

    // Lógica para exibir o modal LGPD toda vez que o site é aberto
    setTimeout(() => {
        modalController.open('lgpd-modal'); // Abre o modal LGPD usando o modalController
    }, 1000); // Exibe após 1 segundo (para a página carregar)
});

// ------------------------ MENSAGENS POPUP (Django Messages) ------------------------
function initDjangoMessages() {
    const messageDivs = document.querySelectorAll('.django-message-popup');

    messageDivs.forEach((messageDiv) => {
        messageDiv.classList.add('show'); // Adiciona a classe para animação de entrada

        // Define um timeout para esconder a mensagem
        setTimeout(() => {
            messageDiv.classList.remove('show'); // Remove a classe para animação de saída
            // Espera a transição terminar antes de ocultar totalmente
            messageDiv.addEventListener('transitionend', function handler() {
                messageDiv.style.display = 'none'; // Finalmente, esconde o elemento
                messageDiv.removeEventListener('transitionend', handler); // Remove o listener após uso
            }, { once: true }); // Usar { once: true } para remover o listener automaticamente

            // Lógica para fechar modais se a mensagem for de sucesso de cadastro
            if (messageDiv.classList.contains('success')) {
                // Fechar qualquer modal que esteja aberto
                modalController.close('register-modal');
                modalController.close('login-form');
            }
        }, 5000); // Exibe por 5 segundos
    });
}

// ------------------------ CARROSSEL ------------------------
function initCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    if (!carouselSlide) {
        console.warn("Elemento .carousel-slide não encontrado. Carrossel não inicializado.");
        return;
    }
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
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
    const dropdownContent = document.querySelector(".dropdown-content"); // Seleciona o conteúdo do dropdown

    if (!categoryBtn || !dropdownContent) {
        console.warn("Elementos do dropdown de categoria não encontrados.");
        return;
    }

    categoryBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que o clique se propague para o document e feche imediatamente
        dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex'; // Alterna flex/none
    });

    // Fecha o menu se clicar fora dele
    document.addEventListener("click", event => {
        if (!categoryBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = "none";
        }
    });
}

// Filtra os jogos ao clicar nas categorias
function initCategoryFilter() {
    const categoryLinks = document.querySelectorAll("#dropdown-category .dropdown-content a");
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
            const dropdownContent = document.querySelector(".dropdown-content");
            if (dropdownContent) {
                dropdownContent.style.display = "none";
            }
        });
    });

    // Esta função é vital para mapear o texto do menu para o atributo data-category
    window.normalizeCategory = function(text) {
    // Transforma o texto do link para bater com o data-category do card
    // 'ação' -> 'acao', 'Menu Principal' -> 'menu_principal', 'quebra cabeça' -> 'quebra_cabeca'
    // ADICIONE esta parte: .replace(/-/g, "_") para transformar hífens em underscores
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_").replace(/-/g, "_");
}

    window.filterGamesByCategory = function(categoria) { // Expondo globalmente
        gameCards.forEach(card => {
            const categoriaCard = card.getAttribute("data-category");
            if (categoria === "menu_principal" || categoriaCard === categoria) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
}
// ------------------------ CONTROLE DE MODAIS GERAL ------------------------

function initModals() {
    // Login Modal
    const loginBtn = document.getElementById("login-btn");
    const closeLoginBtn = document.getElementById("close-login-modal");
    const showRegisterFormLink = document.getElementById("show-register-form"); // Link "Criar Conta" dentro do login
    const showLoginFromRegisterInsideLink = document.getElementById("show-login-form-from-register-inside"); // Link "Fazer Login" dentro do FORM de registro (interno ao login)
    const forgotPasswordLink = document.getElementById('forgot-password-link'); // Link "Esqueci minha senha"
    const showLoginFromForgotLink = document.getElementById("show-login-from-forgot"); // Link "Fazer Login" dentro do form de esqueci senha

    if (loginBtn) loginBtn.addEventListener("click", () => modalController.open('login-form', 'main'));
    if (closeLoginBtn) closeLoginBtn.addEventListener("click", () => modalController.close('login-form'));
    if (showRegisterFormLink) showRegisterFormLink.addEventListener("click", (e) => { e.preventDefault(); modalController.open('login-form', 'register'); });
    if (showLoginFromRegisterInsideLink) showLoginFromRegisterInsideLink.addEventListener("click", (e) => { e.preventDefault(); modalController.open('login-form', 'main'); });
    if (forgotPasswordLink) forgotPasswordLink.addEventListener("click", (e) => { e.preventDefault(); modalController.open('login-form', 'forgot'); });
    if (showLoginFromForgotLink) showLoginFromForgotLink.addEventListener("click", (e) => { e.preventDefault(); modalController.open('login-form', 'main'); });

    // Register Modal (Separado)
    const registerNavBtn = document.getElementById("register-nav-btn"); // Se houver um botão na nav para registro direto
    const registerModalElement = document.getElementById("register-modal"); // O modal de registro separado
    const closeRegisterModalBtn = document.getElementById("close-register-modal");

    // === LINHA CORRIGIDA AQUI ===
    // Agora selecionamos o link "Fazer Login" dentro do modal de registro SEPARADO
    // É CRUCIAL que este seletor CSS (.signup-link a) esteja correto para o SEU HTML
    // Se você adicionou um ID como "link-fazer-login-do-registro", use:
    // const showLoginFromRegisterSeparateLink = document.getElementById("link-fazer-login-do-registro");
    // Ou, se a estrutura é '.signup-link a', e você tem certeza de que só ele deve ser afetado:
    const showLoginFromRegisterSeparateLink = registerModalElement ? registerModalElement.querySelector('.signup-link a') : null;
    // Notei que seu seletor original era '.signup-link a[href="#"]'.
    // Se o seu link não tem mais `href="#"`, isso pode ter quebrado.
    // O seletor '.signup-link a' é mais geral.
    // Se houver múltiplos links '.signup-link a' dentro do registerModalElement,
    // você precisará de um ID específico no HTML ou um seletor mais preciso.
    // ===========================

    if (registerNavBtn) registerNavBtn.addEventListener("click", () => modalController.open('register-modal'));
    if (closeRegisterModalBtn) closeRegisterModalBtn.addEventListener("click", () => modalController.close('register-modal'));

    if (showLoginFromRegisterSeparateLink) {
        showLoginFromRegisterSeparateLink.addEventListener('click', (e) => {
            e.preventDefault();
            modalController.close('register-modal');
            modalController.open('login-form', 'main'); // Abre o modal de login na seção principal
        });
    }

    // ------------------------ CONTROLE DE MODAL LGPD ------------------------
    // Botões do Modal LGPD
    const closeLgpdModalBtn = document.getElementById('close-lgpd-modal');
    const lgpdAgreeButton = document.getElementById('lgpd-agree-continue'); // CORRIGIDO O ID AQUI!
    const lgpdMoreOptionsButton = document.getElementById('lgpd-more-options');

    if (closeLgpdModalBtn) closeLgpdModalBtn.addEventListener('click', () => modalController.close('lgpd-modal'));
    if (lgpdAgreeButton) {
        lgpdAgreeButton.addEventListener('click', () => {
            // REMOVIDA A LINHA: localStorage.setItem('lgpd_accepted', 'true');
            modalController.close('lgpd-modal');
        });
    }
    if (lgpdMoreOptionsButton) {
        lgpdMoreOptionsButton.addEventListener('click', () => {
            alert('Funcionalidade de "Mais Opções" ainda não implementada. Por favor, concorde para continuar.');
            modalController.close('lgpd-modal'); // Pode fechar ou abrir outro modal de detalhes
        });
    }
}

// ------------------------ BARRA DE PESQUISA ------------------------

function initSearchBar() {
    const searchTriggerBtn = document.getElementById("search-trigger");
    const searchInput = document.getElementById("search-input");
    const closeSearchBtn = document.getElementById("close-search");
    const gameCards = document.querySelectorAll(".game-card"); // Pega todos os cards de jogos

    if (!searchTriggerBtn || !searchInput || !closeSearchBtn || gameCards.length === 0) {
        console.warn("Elementos da barra de pesquisa ou cards de jogos não encontrados.");
        return;
    }

    searchTriggerBtn.addEventListener("click", () => {
        searchInput.style.display = "block";
        closeSearchBtn.style.display = "inline-block";
        searchTriggerBtn.style.display = "none";
        searchInput.focus(); // Coloca o foco no input
    });

    closeSearchBtn.addEventListener("click", () => {
        searchInput.value = ""; // Limpa o campo
        searchInput.style.display = "none";
        closeSearchBtn.style.display = "none";
        searchTriggerBtn.style.display = "inline-block";
        // Mostra todos os jogos novamente quando a pesquisa é fechada
        gameCards.forEach(card => {
            card.style.display = "block";
        });
    });

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normaliza para remover acentos

        gameCards.forEach(card => {
            const gameName = card.querySelector("h3")?.textContent?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const gameCategory = card.getAttribute("data-category")?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if (gameName && (gameName.includes(searchTerm) || gameCategory.includes(searchTerm))) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// ------------------------ DESCRIÇÃO LATERAL DOS CARDS NO HOVER ------------------------
function initGameCardHoverDescriptions() {
    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach(card => {
        // Verifica se o card tem um elemento para descrição lateral
        const descriptionBox = card.querySelector(".description-box");
        if (descriptionBox) {
            // Adiciona um listener para mouseenter (hover)
            card.addEventListener("mouseenter", () => {
                // A classe "description-box" já tem display: none por padrão no CSS.
                // Ao adicionar o hover no .game-card no CSS, ele automaticamente
                // muda o display para block e aplica a transição.
                // Não precisamos de JS para `display = 'block'` aqui,
                // pois o CSS já faz isso via `:hover`.

                // Para navegadores que não suportam bem `:has()` ou para fallback:
                // if (window.innerWidth > 1400) { // Verifica se a tela é grande o suficiente
                //    descriptionBox.style.display = 'block';
                //    descriptionBox.style.opacity = '1';
                //    descriptionBox.style.transform = 'translateX(0)';
                // }
            });

            // Adiciona um listener para mouseleave (sair do hover)
            card.addEventListener("mouseleave", () => {
                // O CSS já lida com o `display: none` e a transição
                // quando o hover é removido do .game-card.
                // if (window.innerWidth > 1400) {
                //    descriptionBox.style.opacity = '0';
                //    descriptionBox.style.transform = 'translateX(20px)';
                //    // Pode adicionar um timeout aqui se precisar ocultar completamente após a transição
                //    // setTimeout(() => descriptionBox.style.display = 'none', 400);
                // }
            });
        }
    });
}

// ====================================================================================
// NOVO: TRATAMENTO DO FORMULÁRIO DE LOGIN COM AJAX E REDIRECIONAMENTO
// ====================================================================================
function initLoginFormHandler() {
    const loginForm = document.getElementById('loginActualForm');
    const loginErrorMessageDiv = document.getElementById('login-error-message'); // A div que adicionamos no HTML

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página)

            const emailInput = loginForm.querySelector('input[name="email"]');
            const passwordInput = loginForm.querySelector('input[name="password"]');

            const email = emailInput ? emailInput.value : '';
            const password = passwordInput ? passwordInput.value : '';

            // Oculta qualquer mensagem de erro anterior
            if (loginErrorMessageDiv) {
                loginErrorMessageDiv.style.display = 'none';
                loginErrorMessageDiv.textContent = '';
            }

            try {
                // Pega o token CSRF do campo hidden no formulário
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

                const response = await fetch(loginForm.action, { // Usa o 'action' do formulário
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken, // Importante para o Django
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (data.success) {
                    modalController.close('login-form'); // Fecha o modal de login
                    // Redireciona para a URL fornecida pelo backend (deve ser '/')
                    if (data.redirect_url) {
                        window.location.href = data.redirect_url;
                    }
                } else {
                    // Exibe a mensagem de erro que veio do backend dentro do modal
                    if (loginErrorMessageDiv) {
                        loginErrorMessageDiv.textContent = data.message;
                        loginErrorMessageDiv.style.display = 'block'; // Mostra a mensagem de erro
                    } else {
                        // Fallback caso a div de erro não seja encontrada
                        console.error('Div para mensagem de erro de login não encontrada.');
                        alert(data.message);
                    }
                }
            } catch (error) {
                console.error('Erro ao enviar o formulário de login:', error);
                if (loginErrorMessageDiv) {
                    loginErrorMessageDiv.textContent = 'Ocorreu um erro na conexão. Tente novamente.';
                    loginErrorMessageDiv.style.display = 'block';
                } else {
                    alert('Ocorreu um erro na conexão. Tente novamente.');
                }
            }
        });
    }
}
