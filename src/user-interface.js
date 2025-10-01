// Create user interface class
// Render Start Game Button
// Start game button and initialize two players
// Display two gameboards

import Player from "./player";
import Ship from "./ship";

export default class UserInterface {
    constructor() {
        this.startButton = null;
        this.player1 = null;
        this.player2 = null;
    }

    initialize = () => {
        this.createStartButton();
        this.attachEventListener()
    }

    createStartButton = () => {
        this.startButton = document.createElement('button');
        this.startButton.textContent = 'Start Game'
        document.body.appendChild(this.startButton);
    }

    attachEventListener = () => {
        this.startButton.addEventListener('click', this.handleStartButton)
    }

    handleStartButton = () => {
        if (this.gameContainer) return;

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
        this.player1.gameBoard.placeShip(new Ship(2), 5,4);
        
        this.renderGameboard(this.player1.gameBoard, this.player1Container, '1');
        this.renderGameboard(this.player2.gameBoard, this.player2Container, '2');
    }

    renderGameboard = (gameBoard, playerContainer, playerId) => {
        const board = gameBoard.board;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const box = document.createElement('div');
                box.classList.add('cell');
                box.dataset.x = rowIndex;
                box.dataset.y = colIndex;
                box.dataset.player = playerId;
                box.textContent = cell ? 'o' : ' ';
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