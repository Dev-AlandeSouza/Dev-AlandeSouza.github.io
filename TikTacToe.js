// Variáveis globais
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = false;
let player1Name = '';
let player2Name = '';

// Elementos do DOM
const squares = document.querySelectorAll('.square');
const timetoPlay = document.getElementById('timetoPlay');
const buttonPlay = document.getElementById('buttonPlay');
const resetButton = document.getElementById('resetButton');
const namePlayer1 = document.getElementById('namePlayer1');
const namePlayer2 = document.getElementById('namePlayer2');
const winnerMessage = document.getElementById('winnerMessage');

// Função para alternar o jogador
function togglePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    const playerName = (currentPlayer === 'X') ? player1Name : player2Name;
    timetoPlay.textContent = `Jogador da vez: ${playerName}`;
}

// Função para verificar o vencedor
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            squares[a].id = 'winner';
            squares[b].id = 'winner';
            squares[c].id = 'winner';
            const winnerName = (currentPlayer === 'X') ? player1Name : player2Name;
            timetoPlay.textContent = `Vitória de ${winnerName}!`;
            return true;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        timetoPlay.textContent = "Deu velha!";
        squares.forEach(function(square) {
            square.id = 'loser';
        });
        return true;
    }

    return false;
}

// Função para reiniciar o jogo com novos nomes de jogadores
function resetGameWithNewNames() {
    gameBoard = Array(9).fill('');
    gameActive = true; // Certifique-se de definir gameActive como true
    currentPlayer = 'X';
    const playerName = (currentPlayer === 'X') ? player1Name : player2Name;
    timetoPlay.textContent = `Jogador da vez: ${playerName}`;
    winnerMessage.textContent = ''; // Limpa a mensagem de vencedor
    squares.forEach(function(square) {
        square.textContent = '';
        square.removeAttribute('id');
    });
    player1Name = namePlayer1.value;
    player2Name = namePlayer2.value;
    namePlayer1.disabled = true;
    namePlayer2.disabled = true;
}

// Event listener para os quadrados do jogo
squares.forEach(function(square) {
    square.addEventListener('click', function() {
        if (!gameActive || !player1Name || !player2Name) {
            alert('Por favor, insira os nomes dos jogadores e inicie o jogo antes de jogar.');
            return;
        }
        
        const squareIndex = parseInt(square.getAttribute('data-square')) - 1;
        if (gameActive && !gameBoard[squareIndex]) {
            gameBoard[squareIndex] = currentPlayer;
            square.textContent = currentPlayer;
            if (checkWinner()) {
                // A mensagem já é exibida pela função checkWinner
            } else {
                togglePlayer();
            }
        }
    });
});

// Event listener para o botão Iniciar
buttonPlay.addEventListener('click', function() {
    if (namePlayer1.value && namePlayer2.value) {
        player1Name = namePlayer1.value;
        player2Name = namePlayer2.value;
        timetoPlay.textContent = `Jogador da vez: ${player1Name}`;
        buttonPlay.disabled = true;
        namePlayer1.disabled = true;
        namePlayer2.disabled = true;
        gameActive = true;
    } else {
        alert('Por favor, insira os nomes dos jogadores.');
    }
});

// Event listener para o botão Reiniciar
resetButton.addEventListener('click', function() {
    resetGameWithNewNames();
});
