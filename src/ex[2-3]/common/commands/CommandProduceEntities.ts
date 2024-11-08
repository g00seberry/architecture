import { GameEntity } from "../../Entity/GameEntity";
import { ICommand } from "../../Core/Command";
import { IGameEntityRegister } from "../../Entity/GameEntityRegister";
import { IFactory } from "../../Entity/factories";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../ExceptionHandlerCmd/ExceptionCmd";

export class CommandProduceEntities implements ICommand {
  factory: IFactory<GameEntity[]> | null = null;
  entityReg: IGameEntityRegister | null = null;
  produceEntities(
    newFactory: IFactory<GameEntity[]>,
    newEntityReg: IGameEntityRegister
  ) {
    this.factory = newFactory;
    this.entityReg = newEntityReg;
    return this;
  }
  execute() {
    if (!this.factory || !this.entityReg)
      throw makeExceptionCmd(
        "factory or entityReg is null. Can`t perform CommandProduceMovableEntities command.",
        ExceptionCmdType["unconsistent data"]
      );

    this.factory.produce().forEach((e) => this.entityReg.registerEntity(e));
  }
}
