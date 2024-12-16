import { GameEntity } from "../../Entity";
import { ICommand } from "../../Core/Command";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../ExceptionHandlerCmd/ExceptionCmd";
import { IFuelTank } from "../../Entity/common/IFuelTank";

export class CommandBurnFuel implements ICommand {
  entity: GameEntity | null = null;
  burnFuel(gameEnt: GameEntity) {
    this.entity = gameEnt;
    return this;
  }
  execute() {
    if (!this.entity)
      throw makeExceptionCmd(
        "Unconsistent data. Can`t perform CommandBurnFuel command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    if (!("fuelTank" in this.entity))
      throw makeExceptionCmd(
        "Wrong entity type. Can`t perform CommandBurnFuel command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    const fuelTank = this.entity.fuelTank as IFuelTank;
    if (!fuelTank)
      throw makeExceptionCmd(
        "Wrong fuelTank",
        ExceptionCmdType["unconsistent data"],
        this
      );
    fuelTank.burn();
  }
}
