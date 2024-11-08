import { IFuelTank } from "./common/IFuelTank";
import { GameEntity } from "./GameEntity";

type WithFuelGameEntityDef = {
  fuelTank: IFuelTank;
  setFuelTank(fuelTank: IFuelTank): void;
};
export class WithFuelGameEntity implements GameEntity<WithFuelGameEntityDef> {
  fuelTank: IFuelTank;
  setFuelTank(fuelTank: IFuelTank): void {
    this.fuelTank = fuelTank;
  }
  constructor(fuelTank: IFuelTank) {
    this.fuelTank = fuelTank;
  }
}
