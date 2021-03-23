import { Character } from './Character'

export class Faction {
    private characters: Character[] = []

    constructor(private name: string) {}

    static named(name: string) {
        return new Faction(name)
    }

    add(character: Character) {
        this.characters.push(character)
    }

    includes(character: Character) {
        return this.characters.includes(character)
    }

    remove(character: Character) {
        const index = this.characters.indexOf(character)
        this.characters.splice(index, 1)
    }
}
