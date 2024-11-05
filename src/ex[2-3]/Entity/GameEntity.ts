import { IRotationVelocity } from "../interfaces/IRotationVelocity";
import { IVector } from "../interfaces/IVector";
import { IVelocity } from "../interfaces/IVelocity";

export type GameEntity<T extends Object = {}> = {
  [K in keyof T]: T[K];
};
