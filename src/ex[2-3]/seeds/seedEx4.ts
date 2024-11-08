import { CommandMoveLinear } from "../common/commands";
import { CommandBurnFuel } from "../common/commands/CommandBurnFuel";
import { CommandCheckFuel } from "../common/commands/CommandCheckFuel";
import { MCommand } from "../common/commands/MCommand";
import { SpaceshipFuelTankBurnStrategy } from "../common/strategies/SpaceshipFuelTankBurnStrategy";
import { CoreCmd } from "../Core/CoreCmd";
import { RotationVelocityVec } from "../Core/IRotationVelocity";
import { Vector2 } from "../Core/IVector";
import { VelocityVec } from "../Core/IVelocity";
import { SpaceshipFuelTank } from "../Entity/common/fuelTanks";
import { SpaceShip } from "../Entity/SpaceShip/SpaceShip";

export const seedEx4 = (core: CoreCmd) => {
  const { cmdQueue, entityRegister } = core.config;
  const simpleSpaceShip = new SpaceShip(
    new SpaceshipFuelTank(10, new SpaceshipFuelTankBurnStrategy()),
    new Vector2([0, 0]),
    new RotationVelocityVec([0]),
    new VelocityVec(new Vector2([1, 0]))
  );
  entityRegister.registerEntity(simpleSpaceShip);
  const moveMacroCmd = new MCommand();
  moveMacroCmd.bind([
    new CommandCheckFuel().checkFuel(simpleSpaceShip),
    new CommandMoveLinear().moveLinear(simpleSpaceShip),
    new CommandBurnFuel().burnFuel(simpleSpaceShip),
  ]);
  cmdQueue.enqueue(moveMacroCmd);
};
