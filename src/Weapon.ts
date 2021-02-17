import { Distance } from './Distance'

export interface Weapon {
    outOfRange(distance: Distance): boolean
}
