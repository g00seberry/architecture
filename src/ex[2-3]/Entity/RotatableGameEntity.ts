import { IRotationVelocity } from "../Core/IRotationVelocity";
import { IVelocity } from "../Core/IVelocity";
import { GameEntity } from "./GameEntity";

type RotatingGameEntityDef = {
  rotationVelocity: IRotationVelocity;
  setRotationVelocity(newLocation: IRotationVelocity): void;
  velocity: IVelocity;
  setVelocity(newVelocity: IVelocity): void;
};
export class RotatableGameEntity implements GameEntity<RotatingGameEntityDef> {
  rotationVelocity: IRotationVelocity;
  setRotationVelocity(newRotation: IRotationVelocity): void {
    this.rotationVelocity = newRotation;
  }
  velocity: IVelocity;
  setVelocity(newVelocity: IVelocity): void {
    this.velocity = newVelocity;
  }
  constructor(newRotationVel: IRotationVelocity, newVelocity: IVelocity) {
    this.rotationVelocity = newRotationVel;
    this.velocity = newVelocity;
  }
}
