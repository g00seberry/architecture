import { isAbout, isZero } from "../../utils/utils";
import { CommandRotateVelocity } from "../commands";
import { RotatableGameEntity } from "../Entity";
import { RotationVelocity2D } from "../interfaces/IRotationVelocity";
import { Velocity2D } from "../interfaces/IVelocity";

const rotateVelocityCommand = new CommandRotateVelocity();
test("После поворота на 90 градусов вектор скорости (1,0) === (0,1)", () => {
  const ent = new RotatableGameEntity(
    new RotationVelocity2D([90]),
    new Velocity2D(1, 0)
  );
  rotateVelocityCommand.rotateVelocity(ent).execute();
  const newX = ent.velocity.getVelocityVector().coords[0];
  const newY = ent.velocity.getVelocityVector().coords[1];
  expect(isZero(newX) && isAbout(newY, 1)).toBe(true);
});

test("Попытка сдвинуть объект, у которого невозможно прочитать значение поворота, приводит к ошибке", () => {
  const ent = new RotatableGameEntity(
    new RotationVelocity2D([90]),
    new Velocity2D(1, 0)
  );
  ent.rotationVelocity = null;
  expect(() => {
    rotateVelocityCommand.rotateVelocity(ent).execute();
  }).toThrow();
});
test("Попытка сдвинуть объект, у которого невозможно прочитать значение мгновенной скорости, приводит к ошибке", () => {
  const ent = new RotatableGameEntity(
    new RotationVelocity2D([90]),
    new Velocity2D(1, 0)
  );
  ent.velocity = null;
  expect(() => {
    rotateVelocityCommand.rotateVelocity(ent).execute();
  }).toThrow();
});
