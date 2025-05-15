// Iniciar Jogo
function playGame(gameName) {
    alert("Iniciando o jogo: " + gameName);
}

// Evento de clique nos botões de jogo
document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', function() {
        const gameCard = this.parentElement;
        const gameName = gameCard.querySelector('h3').textContent;
        playGame(gameName);
    });
});

// "Jogar Agora"
document.querySelector('.play-now').addEventListener('click', function() {
    alert("Iniciando o jogo mais popular!");
});

// Alternância de Categorias (Filtrar jogos)
document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('mouseover', function() {
        let category = this.getAttribute('data-category');

        document.querySelectorAll('.game-card').forEach(card => {
            card.style.display = card.getAttribute('data-category') === category ? 'block' : 'none';
        });
    });

    item.addEventListener('mouseleave', function() {
        document.querySelectorAll('.game-card').forEach(card => {
            card.style.display = 'block';
        });
    });
});

// Carrossel Automático
let slideIndex = 0;

function moveCarousel(step) {
    const slidesContainer = document.querySelector('.carousel-slide');
    const totalSlides = document.querySelectorAll('.carousel-item').length;

    slideIndex = (slideIndex + step + totalSlides) % totalSlides;  // Garante o índice correto

    const offset = -slideIndex * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
}

// Controle dos botões no carrossel
document.querySelector('.prev').addEventListener('click', () => moveCarousel(-1));
document.querySelector('.next').addEventListener('click', () => moveCarousel(1));

// Iniciar carrossel automático a cada 3 segundos
setInterval(() => {
    moveCarousel(1);
}, 3000);
