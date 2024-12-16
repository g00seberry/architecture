import { CommandBurnFuel } from "../common/commands/CommandBurnFuel";
import { CommandCheckFuel } from "../common/commands/CommandCheckFuel";
import { SpaceshipFuelTankBurnStrategy } from "../common/strategies/SpaceshipFuelTankBurnStrategy";
import { RotationVelocityVec } from "../Core/IRotationVelocity";
import { Vector2 } from "../Core/IVector";
import { VelocityVec } from "../Core/IVelocity";
import { SpaceshipFuelTank } from "../Entity/common/fuelTanks";
import { SpaceShip } from "../Entity/SpaceShip/SpaceShip";
import { seedEx4 } from "../seeds/seedEx4";
import { gameLoopStep, getInitedCore } from "./common";

test("Написаны тесты к CheckFuelComamnd: выполняется без ошибок", async () => {
  const simpleSpaceShip = new SpaceShip(
    new SpaceshipFuelTank(10, new SpaceshipFuelTankBurnStrategy()),
    new Vector2([0, 0]),
    new RotationVelocityVec([0]),
    new VelocityVec(new Vector2([1, 0]))
  );
  const cmd = new CommandCheckFuel().checkFuel(simpleSpaceShip);
  expect(cmd.execute()).toBe(undefined);
});

test("Написаны тесты к CheckFuelComamnd: ошибка, если бак пуст или сломан", async () => {
  const simpleSpaceShip = new SpaceShip(
    new SpaceshipFuelTank(0, new SpaceshipFuelTankBurnStrategy()),
    new Vector2([0, 0]),
    new RotationVelocityVec([0]),
    new VelocityVec(new Vector2([1, 0]))
  );
  const cmd = new CommandCheckFuel().checkFuel(simpleSpaceShip);
  expect(() => {
    cmd.execute();
  }).toThrow();

  simpleSpaceShip.fuelTank = null;
  expect(() => {
    cmd.execute();
  }).toThrow();
});

test("Написаны тесты к BurnFuelComamnd: выполняется без ошибок", async () => {
  const strat = new SpaceshipFuelTankBurnStrategy();
  const tank = new SpaceshipFuelTank(10, strat);
  strat.bind(tank);
  const simpleSpaceShip = new SpaceShip(
    tank,
    new Vector2([0, 0]),
    new RotationVelocityVec([0]),
    new VelocityVec(new Vector2([1, 0]))
  );
  const cmd = new CommandBurnFuel().burnFuel(simpleSpaceShip);
  cmd.execute();
  expect(simpleSpaceShip.fuelTank.getFuelLevel() === 9).toBe(true);
});
test("Написаны тесты к BurnFuelComamnd: ошибка, если бак сломан", async () => {
  const strat = new SpaceshipFuelTankBurnStrategy();
  const tank = new SpaceshipFuelTank(10, strat);
  strat.bind(tank);
  const simpleSpaceShip = new SpaceShip(
    tank,
    new Vector2([0, 0]),
    new RotationVelocityVec([0]),
    new VelocityVec(new Vector2([1, 0]))
  );
  const cmd = new CommandBurnFuel().burnFuel(simpleSpaceShip);
  simpleSpaceShip.fuelTank = null;
  expect(() => {
    cmd.execute();
  }).toThrow();
});

test("Реализована макрокоманда движения по прямой с расходом топлива и тесты к ней", async () => {
  getInitedCore().then((core) => {
    const { cmdQueue, entityRegister } = core.config;
    seedEx4(core);
    gameLoopStep(core);
    const simpleSpaceShip = entityRegister.list()[0] as SpaceShip;
    expect(
      simpleSpaceShip.fuelTank.getFuelLevel() === 9 &&
        simpleSpaceShip.location.coords[0] === 1 &&
        cmdQueue.isEmpty()
    ).toBe(true);
  });
});
