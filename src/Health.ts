export class Health {
    private constructor(private value: number) {}

    static at(amount: number): Health {
        return new Health(amount)
    }

    equals(health: Health) {
        return this.value === health.value
    }

    decrease() {
        if (this.value > 0) {
            this.value--
        }
    }

    increase() {
        if (this.value < 1000) {
            this.value++
        }
    }
}
