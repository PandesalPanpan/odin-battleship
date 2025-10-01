import GameBoard from "../gameboard";
import Player from "../player";
describe('player class/function', () => {
    it('should have a player class', () => {
        expect(typeof Player).toBe('function');
    });

    it('should have player own gameBoard', () => {
        const player = new Player();
        expect(player.gameBoard instanceof GameBoard).toBe(true);
    })
})