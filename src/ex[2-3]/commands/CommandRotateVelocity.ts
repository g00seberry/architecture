import { GameEntity, RotatableGameEntity } from "../Entity/GameEntity";
import { ICommand } from "../Command/ICommand";
import { ExceptionCmdType, makeExceptionCmd } from "../exceptions/ExceptionCmd";

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
        ExceptionCmdType["unconsistent data"]
      );

    if (!(this.entity instanceof RotatableGameEntity))
      throw makeExceptionCmd(
        "Wrong entity type. Can`t perform CommandRotateVelocity command.",
        ExceptionCmdType["unconsistent data"]
      );
    const { rotationVelocity: rotation, velocity } = this.entity;
    if (!(rotation && velocity)) throw new Error("Wrong rotation or velocity.");
    this.entity.setVelocity(rotation.rotate(velocity));
  }
}
