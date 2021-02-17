import { Weapon } from './Weapon'
import { Distance } from './Distance'

export class Melee implements Weapon {
    private maxRange = Distance.of(2)

    outOfRange(distance: Distance) {
        return distance.greaterThan(this.maxRange)
    }
}
