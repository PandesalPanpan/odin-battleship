export default class Ship {
    // length
    // amount of times hit
    // isSunk

    constructor(length) {
        this.length = length > 1 ? length <= 5 ? length : 5 : 2;
        this.hitCount = 0;
    }

    hit = () => {
        if (this.hitCount + 1 > this.length) {
            return;
        }
        this.hitCount++;
    }

    isSunk = () => {
        return this.hitCount >= this.length;
    }


    // hit method - increases amount of hit
}