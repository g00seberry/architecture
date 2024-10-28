import { IMovingGameEntity, IRotatingGameEntity } from "../GameEntity";

export interface ICommand {
  execute: () => void;
}

export class CommandMoveLinear implements ICommand {
  entity: IMovingGameEntity | null = null;
  moveLinear(gameEnt: IMovingGameEntity) {
    this.entity = gameEnt;
    return this;
  }
  execute() {
    if (!this.entity)
      throw new Error(
        "Entity is empty. Can`t perform CommandMoveLinear execution."
      );
    const { location, velocity } = this.entity;
    if (!(location && velocity)) throw new Error("Wrong location or velocity.");
    this.entity.setLocation(location.add(velocity.getVelocityVector()));
  }
}

/**
 * пока что объект представлен в виде положения в пространстве и скорости,
 * поэтому вращение есть смысл производить только в контексте поворота направления движения,
 * то есть поворачивать вектор скорости
 */
export class CommandRotateVelocity implements ICommand {
  entity: IRotatingGameEntity | null = null;
  rotateVelocity(gameEnt: IRotatingGameEntity) {
    this.entity = gameEnt;
    return this;
  }
  execute() {
    if (!this.entity)
      throw new Error(
        "Entity is empty. Can`t perform CommandRotateVelocity execution."
      );
    const { rotationVelocity: rotation, velocity } = this.entity;
    if (!(rotation && velocity)) throw new Error("Wrong rotation or velocity.");
    this.entity.setVelocity(rotation.rotate(velocity));
  }
}
