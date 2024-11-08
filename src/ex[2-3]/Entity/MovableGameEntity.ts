import { IVector } from "../Core/IVector";
import { IVelocity } from "../Core/IVelocity";
import { GameEntity } from "./GameEntity";

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
