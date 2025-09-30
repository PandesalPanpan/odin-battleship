import GameBoard from "../gameboard";
import Ship from "../ship";

it('should have a GameBoard class/function', () => {
    expect(typeof GameBoard).toBe('function');
})

describe('GameBoard ships instances', () => {
    const gameBoard = new GameBoard();
    const ship1 = new Ship();
    gameBoard.placeShip(ship1, 0, 0)
    it('should have one ship inside the gameBoard', () => {
        expect(gameBoard.getShips().length).toBeGreaterThan(0);
    })

    it('should have parts of the ship be on the right coordinates', () => {
        const board = gameBoard.board;
        expect(board[0][0]).toBe(1);
        expect(board[0][1]).toBe(1);
    })
});