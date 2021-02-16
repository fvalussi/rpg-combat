export class Level {
    constructor(private value: number) {}

    static at(level: number) {
        return new Level(level)
    }

    equals(level: Level) {
        return this.value === level.value
    }

    greaterByFiveLevels(level: Level) {
        return this.value - level.value >= 5
    }
}
