import { GameEntity, MovableGameEntity } from "../Entity";
import { ICommand } from "../Command";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../ExceptionHandlerCmd/ExceptionCmd";

export class CommandMoveLinear implements ICommand {
  entity: GameEntity | null = null;
  moveLinear(gameEnt: GameEntity) {
    this.entity = gameEnt;
    return this;
  }
  execute() {
    if (!this.entity)
      throw makeExceptionCmd(
        "Unconsistent data. Can`t perform CommandFilterAndExecute command.",
        ExceptionCmdType["unconsistent data"]
      );
    if (!(this.entity instanceof MovableGameEntity))
      throw makeExceptionCmd(
        "Wrong entity type. Can`t perform CommandMoveLinear command.",
        ExceptionCmdType["unconsistent data"]
      );

    const { location, velocity } = this.entity;
    if (!(location && velocity)) throw new Error("Wrong location or velocity.");
    this.entity.setLocation(location.add(velocity.getVelocityVector()));
  }
}
