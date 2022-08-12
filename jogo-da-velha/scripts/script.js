window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYER_X_WON = 'PLAYER_X_WON';
    const PLAYER_0_WON = 'PLAYER_O_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isValidAction = (tile) => {
        if (tile.innerHTML === 'X' || tile.innerHTML === 'O') {
            return false;
        }
        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const announce = (type) => {
        switch (type) {
            case PLAYER_0_WON:
                announcer.innerHTML = 'Player <span  class="player0">0</span> Won';
                break;
            case PLAYER_X_WON:
                announcer.innerHTML = 'Player <span  class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = 'TIE';
        }
        announcer.classList.remove('hide');
    }

    const handleResultValidation = () => {
        let roundwon = false;
        for (let i = 0; i <= 7; i++) {
            const winningCondition = winningConditions[i];
            const a = board[winningCondition[0]];
            const b = board[winningCondition[1]];
            const c = board[winningCondition[2]];

            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b == c) {
                roundwon = true;
                break;
            }
        }
        if (roundwon) {
            announce(currentPlayer === "X" ? PLAYER_X_WON : PLAYER_0_WON);
            isGameActive = false;
            return;
        }
        if (!board.includes("")) {
            announce(TIE);
        }
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);

            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));

    })

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        })
    }

    resetButton.addEventListener('click', resetBoard);
});
