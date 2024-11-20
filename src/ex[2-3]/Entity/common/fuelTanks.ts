import { IStrategy } from "../../Core/Strategy/IStrategy";
import { IFuelTank } from "./IFuelTank";

export class SpaceshipFuelTank implements IFuelTank {
  constructor(private fuel: number, private burnStrategy: IStrategy<number>) {}
  getFuelLevel(): number {
    return this.fuel;
  }
  burn(): void {
    this.fuel = this.burnStrategy.execute();
  }
}
