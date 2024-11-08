import { IStrategy } from "../../Core/Strategy/IStrategy";
import { IFuelTank } from "../../Entity/common/IFuelTank";

export class SpaceshipFuelTankBurnStrategy implements IStrategy<number> {
  constructor(readonly tank: IFuelTank) {}
  bind(tank: IFuelTank): number {
    const fuel = tank.getFuelLevel();
    if (fuel > 0) return fuel - 1;
    return fuel;
  }
  execute(): number {
    const fuel = this.tank.getFuelLevel();
    if (fuel > 0) return fuel - 1;
    return fuel;
  }
}
