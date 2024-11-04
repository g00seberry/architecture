import { IRotationVelocity } from "../interfaces/IRotationVelocity";
import { IVector } from "../interfaces/IVector";
import { IVelocity } from "../interfaces/IVelocity";

export type GameEntity<T extends Object = {}> = {
  [K in keyof T]: T[K];
};

type MovingGameEntityDef = {
  location: IVector;
  setLocation(newLocation: IVector): void;
  velocity: IVelocity;
};
export class MovableGameEntity implements GameEntity<MovingGameEntityDef> {
  location: IVector;
  setLocation(newLocation: IVector): void {
    this.location = newLocation;
  }
  velocity: IVelocity;
  constructor(newLocation: IVector, newVelocity: IVelocity) {
    this.location = newLocation;
    this.velocity = newVelocity;
  }
}

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
