import Ship from "./ship.js";

export default class GameBoard {
    constructor() {
        this.ships = [];
        this.receivedAttacks = [];
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
        }
        this.ships.push(ship);
    }

    receiveAttack = (x, y) => {
        // check the cell if its a ship instance or null
        const ship = this.board[x][y];
        if (ship) {
            ship.hit();
        }

        this.receivedAttacks.push({ x, y });

        return !!ship;
    }

    isAllShipSunked = () => {
        // Loop through the list and check if they all have isSunk() true
        return this.ships.every((ship) => {
            return ship.isSunk() === true;
        });
    }

    isValidCoordinates = (length, x, y, isHorizontal = true) => {
        const isStartingPositionInvalid = x < 0 || x > 9 || y < 0 || y > 9;
        if (isStartingPositionInvalid) {
            return false;
        }

        if (isHorizontal) {
            if (y + length > 10) return false;
        } else {
            if (x + length > 10) return false;
        }

        for (let i = 0; i < length; i++) {
            const checkX = isHorizontal ? x : x + i;
            const checkY = isHorizontal ? y + i : y;

            if (this.board[checkX][checkY] !== null) {
                return false;
            }
        }

        return true;
    }

    isShipInGameBoard = (ship) => {
        return this.getShips().some((placedShip) => placedShip === ship)
    }
}