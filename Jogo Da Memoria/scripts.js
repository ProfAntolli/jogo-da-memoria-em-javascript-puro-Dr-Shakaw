const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        checkWinCondition(); // checa se todas as cartas foram viradas com sucesso
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Adicione a classe shake às combinação de cartas 
    firstCard.classList.add('shake');
    secondCard.classList.add('shake');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkWinCondition() {
    const allCardsFlipped = [...cards].every(card => card.classList.contains('flip'));

    if (allCardsFlipped) {
        // Se todas as cartas estiverem viradas, exibe um alerta com a mensagem "Parabéns"
        alert("Parabéns!");
    }
}

cards.forEach(card => {
    card.addEventListener('animationend', () => {
        card.classList.remove('shake');
    });

    card.addEventListener('click', flipCard);
});

// Embaralhe as cartas (função shuffle)
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();