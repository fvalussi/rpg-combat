import { Health } from './Health'

export class Character {
    private health: Health = Health.at(1000)

    static create(options?: { health: number }) {
        const character = new Character()
        if (options) {
            const initialHealth = Health.at(options.health)
            character.health = initialHealth
        }
        return character
    }

    isAlive() {
        const deadHealth = Health.at(0)
        return !this.health.equals(deadHealth)
    }

    hasLevel(level: number) {
        return true
    }

    healthIs(health: Health) {
        return this.health.equals(health)
    }

    attack(target: Character) {
        target.beHurt()
    }

    heal(injured: Character) {
        injured.beHealed()
    }

    private beHurt() {
        this.health.decrease()
    }

    private beHealed() {
        this.health.increase()
    }
}
