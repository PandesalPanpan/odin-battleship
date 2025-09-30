import Ship from "./ship.js";

export default class GameBoard {
    constructor() {
        this.ships = [];
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    }

    getShips = () => {
        return this.ships;
    }

    placeShip = (ship, x, y, isHorizontal = true) => {
        // check if invalid coordinates
        const isInstanceOfShip = ship instanceof Ship;
        const isShipAlreadyPlaced = this.isShipInGameBoard(ship);
        const isInvalidCoordinates = x < 0 || x > 9 || y < 0 || y > 9;
        if (isInvalidCoordinates || !isInstanceOfShip || isShipAlreadyPlaced) {
            return;
        }

        // get the ship length
        for (let i = 0; i < ship.length; i++) {
            if (!isHorizontal) {
                this.board[x + i][y] = 1;
            } else {
                this.board[x][y + i] = 1;
            }
        }
        this.ships.push(ship);

    }

    isShipInGameBoard = (ship) => {
        return this.getShips().filter((placedShip) => {
            return placedShip === ship;
        }).length > 0;
    }
}


