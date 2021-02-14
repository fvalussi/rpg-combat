import { Character } from '../src/Character'
import { Health } from '../src/Health'

describe('Character', () => {
    it('created Character should be alive, with 1000 health and 1 level', () => {
        const character = Character.create()

        expect(character.isAlive()).toBe(true)
        expect(character.hasLevel(1)).toBe(true)
        expect(character.healthIs(Health.at(1000))).toBe(true)
    })

    it('Character deal damage to another Character', () => {
        const character = Character.create()
        const victim = Character.create()

        character.attack(victim)

        expect(victim.healthIs(Health.at(999))).toBe(true)
    })

    it('Character kills another Character', () => {
        const character = Character.create()
        const injured_victim = Character.create({ health: 1 })

        character.attack(injured_victim)

        expect(injured_victim.healthIs(Health.at(0))).toBe(true)
        expect(injured_victim.isAlive()).toBe(false)
    })

    it('Character minimal health is 0', () => {
        const character = Character.create()
        const dead_victim = Character.create({ health: 0 })

        character.attack(dead_victim)

        expect(dead_victim.healthIs(Health.at(0))).toBe(true)
    })

    it('Character heal injured Character', () => {
        const character = Character.create()
        const injured_character = Character.create({ health: 999 })

        character.heal(injured_character)

        expect(injured_character.healthIs(Health.at(1000))).toBe(true)
    })

    it('Character heal injured Character', () => {
        const character = Character.create()
        const alive_character = Character.create({ health: 1000 })

        character.heal(alive_character)

        expect(alive_character.healthIs(Health.at(1000))).toBe(true)
    })
})
