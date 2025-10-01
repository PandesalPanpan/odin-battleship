import GameBoard from "../gameboard";
import Ship from "../ship";

it('should have a GameBoard class/function', () => {
    expect(typeof GameBoard).toBe('function');
})

describe.only('GameBoard ships instances', () => {
    const gameBoard = new GameBoard();
    const ship1 = new Ship();
    const board = gameBoard.board;
    gameBoard.placeShip(ship1, 0, 0)
    it('should have one ship inside the gameBoard', () => {
        expect(gameBoard.getShips().length).toBeGreaterThan(0);
    })

    it('should have parts of the ship be on the right coordinates', () => {
        expect(board[0][0]).toBe(ship1);
        expect(board[0][1]).toBe(ship1);
    })

    it('should not place the ship if the coordinates are invalid', () => {
        const ship2 = new Ship();
        const snapshot = gameBoard.board;
        gameBoard.placeShip(ship2, -1, 10);
        expect(snapshot).toEqual(gameBoard.board);
    });

    it('should not place if passed ship is not an instance of Ship class',() => {
        const shipString = 'Im a ship';
        gameBoard.placeShip(shipString, 1,0);
        for (let i = 0; i < 2; i++) {
            expect(board[1][0+i]).toBeNull();
        }
    })

    // Write a test that if a ship is already in the gameBoard, don't allow to place it
    it('should not place an instance of a ship that is already placed', () => {
        const ship = new Ship(3);
        gameBoard.placeShip(ship, 1, 0);
        gameBoard.placeShip(ship, 2, 0);
        for (let i = 0; i < ship.length; i++) {
            expect(board[1][i]).toBe(ship);
            expect(board[2][i]).toBeNull();
        }
    })

    // Test if the coordinates is already taken
    it('should not place ship its too big for its coordinates', () => {
        const ship = new Ship(5);
        gameBoard.placeShip(ship, 1, 6);
        expect(board[1][6]).toBe(null);
    })
});