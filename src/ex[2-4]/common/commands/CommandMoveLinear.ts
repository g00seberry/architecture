import { GameEntity, MovableGameEntity } from "../../Entity";
import { ICommand } from "../../Core/Command";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../ExceptionHandlerCmd/ExceptionCmd";

export class CommandMoveLinear implements ICommand {
  entity: GameEntity | null = null;
  moveLinear(gameEnt: GameEntity) {
    this.entity = gameEnt;
    return this;
  }
  execute() {
    if (!this.entity)
      throw makeExceptionCmd(
        "Unconsistent data. Can`t perform CommandMoveLinear command.",
        ExceptionCmdType["unconsistent data"],
        this
      );

    if (
      !("location" in this.entity) ||
      !("velocity" in this.entity) ||
      !("setLocation" in this.entity)
    )
      throw makeExceptionCmd(
        "Wrong entity type. Can`t perform CommandMoveLinear command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    const ent = this.entity as MovableGameEntity;
    const { location, velocity } = ent;
    if (!(location && velocity))
      throw makeExceptionCmd(
        "Wrong location or velocity.",
        ExceptionCmdType["unconsistent data"],
        this
      );

    ent.setLocation(location.add(velocity.getVelocityVector()));
  }
}
