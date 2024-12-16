import { GameEntity, RotatableGameEntity } from "../../Entity";
import { ICommand } from "../../Core/Command";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../ExceptionHandlerCmd/ExceptionCmd";

/**
 * пока что объект представлен в виде положения в пространстве и скорости,
 * поэтому вращение есть смысл производить только в контексте поворота направления движения,
 * то есть поворачивать вектор скорости
 */
export class CommandRotateVelocity implements ICommand {
  entity: GameEntity | null = null;
  rotateVelocity(gameEnt: GameEntity) {
    this.entity = gameEnt;
    return this;
  }
  execute() {
    if (!this.entity)
      throw makeExceptionCmd(
        "Entity is empty. Can`t perform CommandRotateVelocity command.",
        ExceptionCmdType["unconsistent data"],
        this
      );

    if (
      !("rotationVelocity" in this.entity) ||
      !("velocity" in this.entity) ||
      !("setVelocity" in this.entity)
    )
      throw makeExceptionCmd(
        "Wrong entity type. Can`t perform CommandRotateVelocity command.",
        ExceptionCmdType["unconsistent data"],
        this
      );

    const ent = this.entity as unknown as RotatableGameEntity;
    const { rotationVelocity: rotation, velocity } = ent;
    if (!(rotation && velocity))
      throw makeExceptionCmd(
        "Wrong rotation or velocity.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    ent.setVelocity(rotation.rotate(velocity));
  }
}
