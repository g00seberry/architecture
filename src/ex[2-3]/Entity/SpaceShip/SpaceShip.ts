import { IRotationVelocity } from "../../Core/IRotationVelocity";
import { IVector } from "../../Core/IVector";
import { IVelocity } from "../../Core/IVelocity";
import { MovableGameEntity, RotatableGameEntity } from "..";
import { IFuelTank } from "../common/IFuelTank";
import { WithFuelGameEntity } from "../WithFuelGameEntity";

export class SpaceShip
  implements WithFuelGameEntity, MovableGameEntity, RotatableGameEntity
{
  fuelTank: IFuelTank;
  location: IVector;
  rotationVelocity: IRotationVelocity;
  velocity: IVelocity;
  setFuelTank(fuelTank: IFuelTank): void {
    this.fuelTank = fuelTank;
  }
  setLocation(newLocation: IVector): void {
    this.location = newLocation;
  }
  setRotationVelocity(newRotation: IRotationVelocity): void {
    this.rotationVelocity = newRotation;
  }
  setVelocity(newVelocity: IVelocity): void {
    this.velocity = newVelocity;
  }
  constructor(
    fuelTank: IFuelTank,
    location: IVector,
    rotationVelocity: IRotationVelocity,
    velocity: IVelocity
  ) {
    this.fuelTank = fuelTank;
    this.location = location;
    this.rotationVelocity = rotationVelocity;
    this.velocity = velocity;
  }
}
