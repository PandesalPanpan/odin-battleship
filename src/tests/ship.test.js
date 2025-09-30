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

describe('hit count property', () => {
    const ship = new Ship(4);
    it('should have a hitCount property', () => {
        expect(ship.hitCount).toBeDefined();
    })

    it('should start with a hitCount of 0', () => {
        expect(ship.hitCount).toEqual(0);
    })
});

describe('hit method', () => {
    const ship = new Ship();
    it('should have a hit method', () => {
        expect(typeof ship.hit).toBe('function');
    });

    it('should increase the hitCount to 1 after a hit', () => {
        ship.hit();
        expect(ship.hitCount).toBe(1);
    })

    it('should not increase the hitCount if exceeds ship length', () => {
        ship.hit();
        expect(ship.hitCount).toBe(1);
    })
});

describe('isSunk method', () => {
    const ship = new Ship(3);
    it('should have a isSunk method', () => {
        expect(typeof ship.isSunk).toBe('function');
    });

    it('should return false after 1 hit', () => {
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    it('should return true after extra hits', () => {
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
})
