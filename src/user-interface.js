// Create user interface class
// Render Start Game Button
// Start game button and initialize two players
// Display two gameboards

import Player from "./player";
import Ship from "./ship";

export default class UserInterface {
    constructor() {
        this.newGameButton = null;
        this.player1 = null;
        this.player2 = null;
    }

    initialize = () => {
        this.createNewGameButton();
        this.attachNewGameEventListener()
    }

    createNewGameButton = () => {
        this.newGameButton = document.createElement('button');
        this.newGameButton.classList.add('new-game-button');
        this.newGameButton.textContent = 'New Game'
        document.body.appendChild(this.newGameButton);
    }

    attachNewGameEventListener = () => {
        this.newGameButton.addEventListener('click', this.handleNewGameButton)
    }

    handleNewGameButton = () => {
        if (this.gameContainer) {
            this.gameContainer.remove();
        };

        // Create the two players
        this.player1 = new Player();
        this.player2 = new Player();

        this.createGameContainer();
        this.createUsersContainer();

        // Display board based on users
        this.displayUserGameboard();
    }

    createGameContainer = () => {
        this.gameContainer = document.createElement('div');
        this.gameContainer.classList.add('game-container');
        document.body.appendChild(this.gameContainer);
    }

    displayUserGameboard = () => {
        // Grab the user 
        // Randomize player1 placeships
        this.generateRandomShipPlacements(this.player1);
        this.generateRandomShipPlacements(this.player2);

        this.renderGameboard(this.player1.gameBoard, this.player1Container, '1');
        this.renderGameboard(this.player2.gameBoard, this.player2Container, '2');



        this.attachGameBoardEventListener();
    }

    generateRandomShipPlacements = (player) => {
        // 3, Ship(2)
        this.placeShips(player, 2, 3);
        // 3, Ship(3)
        this.placeShips(player, 3, 3);
        // 2, Ship(4)
        this.placeShips(player, 2, 4);
        // 1, Ship(5)
        this.placeShips(player, 1, 5);
    }

    placeShips = (player, count, length) => {
        for (let i = 0; i < count; i++) {
            do {
                const currentShip = new Ship(length);
                const currentCoordinates = this.getRandomCoordinates();
                player.gameBoard.placeShip(
                    currentShip,
                    currentCoordinates.x,
                    currentCoordinates.y,
                    Math.random() > 0.5 ? true : false
                );

                // Check if ships is placed
                const isShipPlaced = player.gameBoard.ships.some((ship) => {
                    return currentShip === ship;
                })

                if (isShipPlaced) break;

            } while (true);
        }
    }



    attachGameBoardEventListener = () => {
        this.player2Container.addEventListener('click', this.handlePlayerAttack)
    }

    handlePlayerAttack = (event) => {
        const clicked = event.target.closest('div');
        if (clicked.classList.contains('cell') && !clicked.classList.contains('miss') && !clicked.classList.contains('hit')) {
            this.processAttack(clicked)


            this.generateComputerAttack();

        }
    }

    processAttack = (cellElement) => {
        const playerReceiveAttack = cellElement.dataset.player == 2 ? this.player2 : this.player1;
        const isHit = playerReceiveAttack.gameBoard.receiveAttack(cellElement.dataset.x, cellElement.dataset.y);

        // update cell
        this.updateCell(cellElement, isHit);

        // Check is a players gameBoard all ship sunk
        const isGameOver = playerReceiveAttack.gameBoard.isAllShipSunked();
        if (isGameOver) {
            this.disableGameContainerInteraction();

            setTimeout(() => {
                this.showGameOverModal(`
                        ${cellElement.dataset.player == 2 ? 'Player 1' : 'Player 2'} wins!
                        `);
            }, 100);
        }

    }

    generateComputerAttack = () => {
        // Select a valid cell on html on the player 1 container

        // Generate an x and a y and check if its not already taken in the player1.ReceivedAttacks
        let attackCoordinates;
        const usedCoordinates = this.player1.gameBoard.receivedAttacks
        do {
            attackCoordinates = this.getRandomCoordinates();
            const isNotValid = usedCoordinates.some((usedCoordinate) => {
                return usedCoordinate.x == attackCoordinates.x && usedCoordinate.y == attackCoordinates.y;
            })

            if (!isNotValid) break;

        } while (true)

        // Trigger a handlePlayerAttack by using querySelector
        const targetCell = this.getCellWithCoordinates(this.player1Container, attackCoordinates);

        this.processAttack(targetCell);

    }

    getRandomCoordinates = () => {
        return {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }
    }

    getCellWithCoordinates = (container, coordinates) => {
        return container.querySelector(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`)
    }

    updateCell = (cell, isHit) => {
        if (isHit) {
            // update cell class to hit
            cell.classList.add('hit');
        } else {
            // update cell to miss
            cell.classList.add('miss');
        }


    }

    disableGameContainerInteraction = () => {
        this.gameContainer.style.pointerEvents = 'none';
        this.gameContainer.classList.add('game-over');
    }

    showGameOverModal = (message) => {
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
        <div class="modal-content">
            <h2>${message}</h2>
            <button id="close-modal" class="modal-button">OK</button>
        </div>
        `

        document.body.appendChild(dialog);
        dialog.showModal();

        // event listener that removes the elements itself
        dialog.querySelector('#close-modal').addEventListener('click', () => {
            dialog.close();
            dialog.remove();
        })
    }

    renderGameboard = (gameBoard, playerContainer, playerId) => {
        const board = gameBoard.board;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const box = document.createElement('div');
                // only show player 1 ships
                box.dataset.x = rowIndex;
                box.dataset.y = colIndex;
                box.dataset.player = playerId;
                box.classList.add('cell');

                if (cell && playerId === '1') {
                    box.textContent = 'S';
                    box.classList.add('ship');
                } else {
                    box.textContent = ' '
                }
                playerContainer.appendChild(box);
            })
        })
    }

    createUsersContainer = () => {
        // Create user container
        this.player1Container = document.createElement('div');
        this.player1Container.id = 'player-1-board';
        this.player1Container.classList.add('container');

        this.player2Container = document.createElement('div');
        this.player2Container.id = 'player-2-board';
        this.player2Container.classList.add('container');

        this.gameContainer.appendChild(this.player1Container);
        this.gameContainer.appendChild(this.player2Container);
    }


}