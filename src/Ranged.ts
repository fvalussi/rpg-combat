import { Weapon } from './Weapon'
import { Distance } from './Distance'

export class Ranged implements Weapon {
    private maxRange = Distance.of(20)

    outOfRange(distance: Distance) {
        return distance.greaterThan(this.maxRange)
    }
}
