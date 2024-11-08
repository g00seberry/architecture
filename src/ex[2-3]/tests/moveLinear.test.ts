import { CommandMoveLinear } from "../common/commands";
import { MovableGameEntity } from "../Entity";
import { Vector2 } from "../interfaces/IVector";
import { VelocityVec } from "../interfaces/IVelocity";

const moveCommand = new CommandMoveLinear();
test("Для объекта, находящегося в точке (12, 5) и движущегося со скоростью (-7, 3) движение меняет положение объекта на (5, 8)", () => {
  const ent = new MovableGameEntity(
    new Vector2([12, 5]),
    new VelocityVec(new Vector2([-7, 3]))
  );
  moveCommand.moveLinear(ent).execute();
  expect(ent.location.coords).toEqual([5, 8]);
});

test("Попытка сдвинуть объект, у которого невозможно прочитать положение в пространстве, приводит к ошибке", () => {
  const ent = new MovableGameEntity(
    new Vector2([12, 5]),
    new VelocityVec(new Vector2([-7, 3]))
  );
  ent.location = null;
  expect(() => {
    moveCommand.moveLinear(ent).execute();
  }).toThrow();
});
test("Попытка сдвинуть объект, у которого невозможно прочитать значение мгновенной скорости, приводит к ошибке", () => {
  const ent = new MovableGameEntity(
    new Vector2([12, 5]),
    new VelocityVec(new Vector2([-7, 3]))
  );
  ent.velocity = null;
  expect(() => {
    moveCommand.moveLinear(ent).execute();
  }).toThrow();
});

// изменить положение в пространстве нельзя только если скорость или исходное положение неустановлены
test("Попытка сдвинуть объект, у которого невозможно изменить положение в пространстве, приводит к ошибке", () => {
  const ent = new MovableGameEntity(
    new Vector2([12, 5]),
    new VelocityVec(new Vector2([-7, 3]))
  );
  ent.velocity = null;
  expect(() => {
    moveCommand.moveLinear(ent).execute();
  }).toThrow();
});
