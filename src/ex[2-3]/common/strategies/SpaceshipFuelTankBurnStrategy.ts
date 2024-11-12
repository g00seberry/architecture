import { IStrategy } from "../../Core/Strategy/IStrategy";
import { IFuelTank } from "../../Entity/common/IFuelTank";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../ExceptionHandlerCmd/ExceptionCmd";

export class SpaceshipFuelTankBurnStrategy implements IStrategy<number> {
  tank: IFuelTank;
  bind(tank: IFuelTank): number {
    const fuel = tank.getFuelLevel();
    if (fuel > 0) return fuel - 1;
    return fuel;
  }
  execute(): number {
    if (!this.tank)
      throw makeExceptionCmd(
        "Can`t execute SpaceshipFuelTankBurnStrategy",
        ExceptionCmdType["unconsistent data"],
        this
      );

    const fuel = this.tank.getFuelLevel();
    if (fuel > 0) return fuel - 1;
    return fuel;
  }
}
