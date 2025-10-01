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
        // Grab the user board
        const board = this.player1.gameBoard.board;
        this.player1.gameBoard.placeShip(new Ship(), 0, 0);




        // For each row array elements, place a cell
        board.forEach((row) => {
            row.forEach((cell) => {
                const box = document.createElement('div');
                box.classList.add('cell');
                box.textContent = cell ? 'o' : ' ';
                this.player1Container.appendChild(box);
            })
        })
        // Display it
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