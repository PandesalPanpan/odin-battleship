// Create user interface class
// Render Start Game Button
// Start game button and initialize two players
// Display two gameboards

export default class UserInterface {
    constructor() {
        this.startButton = null;
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
        console.log('Handling Start Button');
    }
}