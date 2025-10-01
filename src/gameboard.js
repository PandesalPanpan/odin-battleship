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
        const isValidCoordinates = this.isValidCoordinates(ship.length, x, y, isHorizontal);
        if (!isValidCoordinates || !isInstanceOfShip || isShipAlreadyPlaced) {
            return;
        }

        // get the ship length
        for (let i = 0; i < ship.length; i++) {
            if (!isHorizontal) {
                this.board[x + i][y] = ship;
            } else {
                this.board[x][y + i] = ship;
            }
            if (!isHorizontal) {
                this.board[x + i][y] = ship;
            } else {
                this.board[x][y + i] = ship;
            }
        }
        this.ships.push(ship);

    }

    isValidCoordinates = (length, x, y, isHorizontal = true) => {
        const isStartingPositionInvalid = x < 0 || x > 9 || y < 0 || y > 9;
        if (isHorizontal) {
            const endOfy = y+length - 1;
            return !isStartingPositionInvalid && (endOfy > -1 && endOfy < 10);
        } else {
            const endOfx = x+length - 1;
            return !isStartingPositionInvalid && (endOfX > -1 && endOfx < 10)
        }
    }

    isShipInGameBoard = (ship) => {
        return this.getShips().some((placedShip) => placedShip === ship)
    }
}


