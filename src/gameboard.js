import Ship from "./ship.js";

export default class GameBoard {
    constructor() {
        this.ships = [];
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    }

    getShips = () => {
        return this.ships;
    }
    
    placeShip = (ship, x, y) => {
        // get the ship length
        for (let i = 0; i < ship.length; i++) {
            this.board[x][y+i] = 1;
        }
        this.ships.push(ship);

    }


}