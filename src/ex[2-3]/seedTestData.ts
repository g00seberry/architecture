import {
  CommandMoveLinear,
  CommandProduceEntities,
  CommandRotateVelocity,
} from "./commands";
import { CoreCmd } from "./Core/CoreCmd";
import {
  FactoryMovableEntity,
  FactoryRotatableEntity,
} from "./Entity/factories";
import { MovableGameEntity, RotatableGameEntity } from "./Entity/GameEntity";
import {
  RotationVelocity2D,
  RotationVelocityVec,
} from "./interfaces/IRotationVelocity";
import { Vector2 } from "./interfaces/IVector";
import { Velocity2D, VelocityVec } from "./interfaces/IVelocity";

export const seedTestData = (core: CoreCmd) => {
  const { cmdQueue, entityRegister } = core.config;
  const fctyMovableEntities = new FactoryMovableEntity([
    [new Vector2([12, 5]), new VelocityVec(new Vector2([-7, 3]))],
    [new Vector2([11, 5]), new VelocityVec(new Vector2([-7, 3]))],
  ]);
  const fctyRotatableEntities = new FactoryRotatableEntity([
    [new RotationVelocity2D([45]), new Velocity2D(1, 0)],
    [new RotationVelocityVec([45]), new VelocityVec(new Vector2([1, 1]))],
  ]);
  /**
   * создадим сущности, которые можно двигать
   */
  cmdQueue.enqueue(
    new CommandProduceEntities().produceEntities(
      fctyMovableEntities,
      entityRegister
    )
  );
  /**
   * создадим сущности, которые можно поворачивать
   */
  cmdQueue.enqueue(
    new CommandProduceEntities().produceEntities(
      fctyRotatableEntities,
      entityRegister
    )
  );
  /**
   * достанем сущности, которые можно двигать из регистра и двинем
   */
  entityRegister
    .list()
    .filter((e) => e instanceof MovableGameEntity)
    .filter(Boolean)
    .map((e) => new CommandMoveLinear().moveLinear(e))
    .forEach((e) => cmdQueue.enqueue(e));

  /**
   * достанем сущности, которые можно поворачивать из регистра и повернем
   */
  entityRegister
    .list()
    .filter((e) => e instanceof RotatableGameEntity)
    .filter(Boolean)
    .map((e) => new CommandRotateVelocity().rotateVelocity(e))
    .forEach((e) => cmdQueue.enqueue(e));
};
