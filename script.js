const cardsArray = [
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'E', img: 'E' },
    { name: 'F', img: 'F' },
    { name: 'G', img: 'G' },
    { name: 'H', img: 'H' }
];

let gameBoard = document.getElementById('game-board');
let timerElement = document.getElementById('timer');
let movesElement = document.getElementById('moves');
let restartButton = document.getElementById('restart');

let timer;
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let moves = 0;
let time = 0;

function startGame() {
    moves = 0;
    time = 0;
    timerElement.textContent = time;
    movesElement.textContent = moves;
    gameBoard.innerHTML = '';
    clearInterval(timer);
    startTimer();

    let gameCards = [...cardsArray, ...cardsArray];
    gameCards.sort(() => 0.5 - Math.random());

    gameCards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${card.img}</div>
                <div class="card-back"></div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timerElement.textContent = time;
    }, 1000);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesElement.textContent = moves;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

restartButton.addEventListener('click', startGame);

startGame();
