import { IRotationVelocity } from "./interfaces/IRotationVelocity";
import { IVector, Vector2 } from "./interfaces/IVector";
import { IVelocity } from "./interfaces/IVelocity";

export type GameEntity<T extends Object = {}> = {
  [K in keyof T]: T[K];
};

export interface IMovingGameEntity {
  location: IVector;
  setLocation(newLocation: IVector): void;
  velocity: IVelocity;
}
export class MovableGameEntity implements GameEntity<IMovingGameEntity> {
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

export interface IRotatingGameEntity {
  rotationVelocity: IRotationVelocity;
  setRotationVelocity(newLocation: IRotationVelocity): void;
  velocity: IVelocity;
  setVelocity(newVelocity: IVelocity): void;
}
export class RotatebleGameEntity implements GameEntity<IRotatingGameEntity> {
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
