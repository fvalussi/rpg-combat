import { AttackType } from './AttackType'

export class Ranged extends AttackType {
    outOfRange(distance: number): boolean {
        return distance > 20
    }
}
