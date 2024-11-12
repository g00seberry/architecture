import { GameEntity } from "../../Entity";
import { ICommand } from "../../Core/Command";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../ExceptionHandlerCmd/ExceptionCmd";
import { WithFuelGameEntity } from "../../Entity/WithFuelGameEntity";

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
    if (!(this.entity instanceof WithFuelGameEntity))
      throw makeExceptionCmd(
        "Wrong entity type. Can`t perform CommandBurnFuel command.",
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
    fuelTank.burn();
  }
}
