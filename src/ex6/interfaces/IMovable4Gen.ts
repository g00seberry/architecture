import { IVector } from "../../ex[2-4]/Core/IVector";

export interface IMovable4Gen {
  getPosition(): IVector;
  setPosition(newValue: IVector): IVector;
  getVelocity(): IVector;
  finish(): void;
}
