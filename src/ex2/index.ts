import {
  CommandMoveLinear,
  CommandRotateVelocity,
} from "./interfaces/ICommand";
import { MovableGameEntity, RotatebleGameEntity } from "./GameEntity";
import { degrees2Radians } from "./utils";
import { Vector2 } from "./interfaces/IVector";
import { Velocity2D, VelocityVec } from "./interfaces/IVelocity";
import {
  RotationVelocity2D,
  RotationVelocityVec,
} from "./interfaces/IRotationVelocity";

/**
 * Тут уже желательно использовать фабрику для создания
 * игровых объектов, которые движутся в 2D
 */

// ДВИЖЕНИЕ
const movableEntitiesList: MovableGameEntity[] = [
  new MovableGameEntity(
    new Vector2([12, 5]),
    new VelocityVec(new Vector2([-7, 3]))
  ),
  new MovableGameEntity(
    new Vector2([0, 0]),
    new Velocity2D(1, degrees2Radians(45))
  ),
];
const moveCommand = new CommandMoveLinear();
movableEntitiesList.forEach((e) => moveCommand.moveLinear(e).execute());
console.log(movableEntitiesList.map((e) => e.location));

// ПОВОРОТ
const rotatableEntitiesList: RotatebleGameEntity[] = [
  new RotatebleGameEntity(new RotationVelocity2D([45]), new Velocity2D(1, 45)),
  new RotatebleGameEntity(
    new RotationVelocityVec([45]),
    new VelocityVec(new Vector2([1, 1]))
  ),
];

const rotateCommand = new CommandRotateVelocity();
rotatableEntitiesList.forEach((e) => rotateCommand.rotateVelocity(e).execute());
console.log(rotatableEntitiesList.map((e) => e.velocity.getVelocityVector()));
