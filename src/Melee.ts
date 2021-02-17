import { AttackType } from './AttackType'

export class Melee extends AttackType {
    outOfRange(distance: number): boolean {
        return distance > 2
    }
}
