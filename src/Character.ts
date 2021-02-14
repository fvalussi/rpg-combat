import { Health } from './Health'

export class Character {
    private health: Health = Health.at(1000)

    static create(options?: { health: number }) {
        const character = new Character()
        if (options) character.health = Health.at(options?.health)
        return character
    }

    isAlive() {
        return !this.health.equals(Health.at(0))
    }

    hasLevel(level: number) {
        return true
    }

    healthIs(health: Health) {
        return this.health.equals(health)
    }

    attack(target: Character) {
        target.health.decrease()
    }

    heal(injured: Character) {
        injured.health.increase()
    }
}
