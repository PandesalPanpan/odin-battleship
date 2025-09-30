import Ship from "../ship"

it('should be an instance of a function/class', () => {
    expect(typeof Ship).toBe('function');
})

describe('properties of the instance ship', () => {
    it('should have a property length of 1', () => {
        const ship = new Ship(1);
        expect(ship.length).toBe(1);
    });

    it('should be fixed to length 1 if input < 1', () => {
        const ship = new Ship(-1);
        expect(ship.length).toBe(1);
    });

    it('should have a property length of 8', () => {
        const ship = new Ship(8);
        expect(ship.length).toBe(8);
    })

})
