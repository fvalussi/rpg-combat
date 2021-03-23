import { HealthPoints } from './HealthPoints'
import { Level } from './Level'
import { Weapon } from './Weapon'
import { Melee } from './Melee'
import { Ranged } from './Ranged'
import { Distance } from './Distance'
import { Faction } from './Faction'

export class Character {
    private health: HealthPoints = Character.getInitialHealth()
    private level: Level = Character.getInitialLevel()
    private weapon: Weapon = Character.meleeAttackType()
    private factions: Faction[] = []

    static create() {
        return new Character()
    }

    static createRanged() {
        const character = new Character()
        character.weapon = Character.rangedAttackType()
        return character
    }

    static createWithHealth(health: HealthPoints) {
        const character = new Character()
        character.health = health
        return character
    }

    static createWithLevel(level: Level) {
        const character = new Character()
        character.level = level
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

    attack(character: Character, distance: Distance) {
        if (
            character === this ||
            this.weapon.outOfRange(distance) ||
            this.isAlliedWith(character)
        ) {
            return
        }
        const damage = this.calculateDamage(character)
        character.reduceHealth(damage)
    }

    heal(character: Character) {
        if (
            character.isAlive() &&
            (this.isAlliedWith(character) || this == character)
        ) {
            character.health.increase()
        }
    }

    private calculateDamage(character: Character) {
        const damage = Character.getBaseDamage()
        if (character.isMoreExperienced(this)) {
            return damage.reduced()
        }
        if (this.isMoreExperienced(character)) {
            return damage.increased()
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

    private static meleeAttackType() {
        return new Melee()
    }

    private static rangedAttackType() {
        return new Ranged()
    }

    belongsToFaction(faction: Faction) {
        return faction.includes(this)
    }

    joinFaction(faction: Faction) {
        faction.add(this)
        this.factions.push(faction)
    }

    leaveFaction(faction: Faction) {
        faction.remove(this)
        const index = this.factions.indexOf(faction)
        this.factions.splice(index, 1)
    }

    isAlliedWith(character: Character) {
        const belongsToFaction:
            | Faction
            | undefined = this.factions.find((f: Faction) =>
            f.includes(character)
        )
        return !!belongsToFaction
    }
}
