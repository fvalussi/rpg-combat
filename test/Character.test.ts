import { Character } from '../src/Character'
import { HealthPoints } from '../src/HealthPoints'
import { Level } from '../src/Level'

describe('Character', () => {
    describe('All Characters, when created, have', () => {
        it('HealthPoints, starting at 1000', () => {
            const character = Character.create()

            expect(character.healthIs(HealthPoints.at(1000))).toBe(true)
            expect(character.healthIs(HealthPoints.at(1))).toBe(false)
        })

        it('Level, starting at 1', () => {
            const character = Character.create()

            expect(character.hasLevel(Level.at(1))).toBe(true)
            expect(character.hasLevel(Level.at(2))).toBe(false)
        })

        it('May be Alive or Dead, starting Alive', () => {
            const character = Character.create()

            expect(character.isAlive()).toBe(true)
        })
    })

    it('Characters can Deal Damage to Characters', () => {
        const character = Character.create()
        const victim = Character.create()

        character.attack(victim)

        expect(victim.healthIs(HealthPoints.at(999))).toBe(true)
    })

    it('When damage received exceeds current HealthPoints, HealthPoints becomes 0 and the character dies', () => {
        const character = Character.create()
        const injured_victim = Character.createWithHealth(1)

        character.attack(injured_victim)

        expect(injured_victim.healthIs(HealthPoints.at(0))).toBe(true)
        expect(injured_victim.isAlive()).toBe(false)
    })

    it('Character minimal health is 0', () => {
        const character = Character.create()
        const dead_victim = Character.createWithHealth(0)

        character.attack(dead_victim)

        expect(dead_victim.healthIs(HealthPoints.at(0))).toBe(true)
    })

    it('A Character can only Heal itself', () => {
        const character = Character.createWithHealth(999)

        character.heal()

        expect(character.healthIs(HealthPoints.at(1000))).toBe(true)
    })

    it('Dead characters cannot be healed', () => {
        const character = Character.createWithHealth(0)

        character.heal()

        expect(character.healthIs(HealthPoints.at(0))).toBe(true)
    })

    it('Healing cannot raise health above 1000', () => {
        const character = Character.createWithHealth(1000)

        character.heal()

        expect(character.healthIs(HealthPoints.at(1000))).toBe(true)
    })

    it('A Character cannot Deal Damage to itself', () => {
        const character = Character.create()

        character.attack(character)

        expect(character.healthIs(HealthPoints.at(1000))).toBe(true)
    })

    describe('When dealing damage', () => {
        it('If the target is 5 or more Levels above the attacker, Damage is reduced by 50%', () => {
            const character = Character.create()
            const target = Character.createWithLevel(6)

            character.attack(target)

            expect(target.healthIs(HealthPoints.at(999.5))).toBe(true)
        })

        it('If the target is 5 or more levels below the attacker, Damage is increased by 50%', () => {
            const character = Character.createWithLevel(6)
            const target = Character.create()

            character.attack(target)

            expect(target.healthIs(HealthPoints.at(998))).toBe(true)
        })
    })
})
