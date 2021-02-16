export class HealthPoints {
    private constructor(private value: number) {}

    static at(amount: number): HealthPoints {
        return new HealthPoints(amount)
    }

    equals(healthPoints: HealthPoints) {
        return this.value === healthPoints.value
    }

    decrease(healthPoints: HealthPoints) {
        if (this.value > 0) {
            this.value = this.value - healthPoints.value
        }
    }

    increase() {
        if (this.value < 1000) {
            this.value++
        }
    }

    half(): HealthPoints {
        return HealthPoints.at(this.value / 2)
    }

    twice() {
        return HealthPoints.at(this.value * 2)
    }
}
