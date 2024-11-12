import { GameEntity } from "../../Entity";
import { ICommand } from "../../Core/Command";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../ExceptionHandlerCmd/ExceptionCmd";
import { WithFuelGameEntity } from "../../Entity/WithFuelGameEntity";

export class CommandCheckFuel implements ICommand {
  entity: GameEntity | null = null;
  checkFuel(gameEnt: GameEntity) {
    this.entity = gameEnt;
    return this;
  }
  execute() {
    if (!this.entity)
      throw makeExceptionCmd(
        "Unconsistent data. Can`t perform CommandCheckFuel command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    if (!(this.entity instanceof WithFuelGameEntity))
      throw makeExceptionCmd(
        "Wrong entity type. Can`t perform CommandCheckFuel command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    const { fuelTank } = this.entity;
    if (!fuelTank)
      throw makeExceptionCmd(
        "Wrong fuelTank",
        ExceptionCmdType["unconsistent data"],
        this
      );
    if (fuelTank.getFuelLevel() === 0)
      throw makeExceptionCmd(
        "Fuel is expended",
        ExceptionCmdType["fuel is expended"],
        this
      );
  }
}
