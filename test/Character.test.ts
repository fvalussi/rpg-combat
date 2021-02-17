import { Character } from '../src/Character'
import { HealthPoints } from '../src/HealthPoints'
import { Level } from '../src/Level'
import { Distance } from '../src/Distance'

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

        when_Character_attacks(character, victim)

        expect(victim.healthIs(HealthPoints.at(999))).toBe(true)
    })

    it('When damage received exceeds current HealthPoints, HealthPoints becomes 0 and the character dies', () => {
        const character = Character.create()
        const injured_victim = Character.createWithHealth(HealthPoints.at(1))

        when_Character_attacks(character, injured_victim)

        expect(injured_victim.healthIs(HealthPoints.at(0))).toBe(true)
        expect(injured_victim.isAlive()).toBe(false)
    })

    it('Character minimal health is 0', () => {
        const character = Character.create()
        const dead_victim = Character.createWithHealth(HealthPoints.at(0))

        when_Character_attacks(character, dead_victim)

        expect(dead_victim.healthIs(HealthPoints.at(0))).toBe(true)
    })

    it('A Character can only Heal itself', () => {
        const character = Character.createWithHealth(HealthPoints.at(999))

        character.heal()

        expect(character.healthIs(HealthPoints.at(1000))).toBe(true)
    })

    it('Dead characters cannot be healed', () => {
        const character = Character.createWithHealth(HealthPoints.at(0))

        character.heal()

        expect(character.healthIs(HealthPoints.at(0))).toBe(true)
    })

    it('Healing cannot raise health above 1000', () => {
        const character = Character.createWithHealth(HealthPoints.at(1000))

        character.heal()

        expect(character.healthIs(HealthPoints.at(1000))).toBe(true)
    })

    it('A Character cannot Deal Damage to itself', () => {
        const character = Character.create()

        when_Character_attacks(character, character)

        expect(character.healthIs(HealthPoints.at(1000))).toBe(true)
    })

    describe('When dealing damage', () => {
        it('If the target is 5 or more Levels above the attacker, Damage is reduced by 50%', () => {
            const character = Character.create()
            const target = Character.createWithLevel(Level.at(6))

            when_Character_attacks(character, target)

            expect(target.healthIs(HealthPoints.at(999.5))).toBe(true)
        })

        it('If the target is 5 or more levels below the attacker, Damage is increased by 50%', () => {
            const character = Character.createWithLevel(Level.at(6))
            const target = Character.create()

            when_Character_attacks(character, target)

            expect(target.healthIs(HealthPoints.at(998))).toBe(true)
        })
    })

    describe('Characters have an attack Max Range and Characters must be in range to deal damage to a target', () => {
        it('Melee fighters have a range of 2 meters', () => {
            const character = Character.create()
            const target = Character.create()
            const distance = Distance.of(3)

            when_Character_attacks_from_Distance(character, target, distance)

            expect(target.healthIs(HealthPoints.at(1000))).toBe(true)
        })

        it('Melee fighters have a range of 2 meters BIS', () => {
            const character = Character.create()
            const target = Character.create()
            const distance = Distance.of(2)

            character.attack(target, distance)

            expect(target.healthIs(HealthPoints.at(999))).toBe(true)
        })

        it('Ranged fighters have a range of 20 meters', () => {
            const character = Character.createRanged()
            const target = Character.create()
            const distance = Distance.of(20)

            character.attack(target, distance)

            expect(target.healthIs(HealthPoints.at(999))).toBe(true)
        })

        it('Ranged fighters have a range of 20 meters BIS', () => {
            const character = Character.createRanged()
            const target = Character.create()
            const distance = Distance.of(21)

            character.attack(target, distance)

            expect(target.healthIs(HealthPoints.at(1000))).toBe(true)
        })
    })

    function when_Character_attacks_from_Distance(
        character: Character,
        victim: Character,
        distance: Distance
    ) {
        character.attack(victim, distance)
    }

    function when_Character_attacks(character: Character, victim: Character) {
        const distance = Distance.of(1)
        Distance.of(1)
        character.attack(victim, distance)
    }
})
