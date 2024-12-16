import { IFuelTank } from "./common/IFuelTank";

export interface WithFuelGameEntity {
  fuelTank: IFuelTank;
  setFuelTank(fuelTank: IFuelTank): void;
}
