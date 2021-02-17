export class Distance {
    constructor(private value: number) {}

    static of(distance: number) {
        return new Distance(distance)
    }

    greaterThan(distance: Distance) {
        return this.value > distance.value
    }
}
