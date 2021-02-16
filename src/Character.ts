import { HealthPoints } from './HealthPoints'
import { Level } from './Level'

export class Character {
    private health: HealthPoints = Character.getInitialHealth()
    private level: Level = Character.getInitialLevel()

    static create() {
        return new Character()
    }

    static createWithHealth(health: number) {
        const character = new Character()
        character.health = HealthPoints.at(health)
        return character
    }

    static createWithLevel(level: number) {
        const character = new Character()
        character.level = Level.at(level)
        return character
    }

    isAlive() {
        const deadHealth = HealthPoints.at(0)
        return !this.health.equals(deadHealth)
    }

    hasLevel(level: Level) {
        return this.level.equals(level)
    }

    healthIs(health: HealthPoints) {
        return this.health.equals(health)
    }

    attack(target: Character) {
        if (target === this) {
            return
        }
        const damage = this.calculateDamage(target)
        target.reduceHealth(damage)
    }

    heal() {
        if (this.isAlive()) {
            this.health.increase()
        }
    }

    private calculateDamage(target: Character) {
        const damage = Character.getBaseDamage()
        if (target.isMoreExperienced(this)) {
            return damage.half()
        }
        if (this.isMoreExperienced(target)) {
            return damage.twice()
        }
        return damage
    }

    private isMoreExperienced(character: Character) {
        const characterLevel = character.level
        return this.level.greaterByFiveLevels(characterLevel)
    }

    private reduceHealth(health: HealthPoints) {
        this.health.decrease(health)
    }

    private static getBaseDamage() {
        return HealthPoints.at(1)
    }

    private static getInitialHealth() {
        return HealthPoints.at(1000)
    }

    private static getInitialLevel() {
        return Level.at(1)
    }
}
