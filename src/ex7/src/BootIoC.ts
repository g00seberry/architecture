import { CommandIoCBootstrap, IoC } from "../../ex5/IoC";
import { IoCDependencyContainer } from "../../ex5/IoCDependencyContainer";
import { IoCResolveStrategyStd } from "../../ex5/IoCResolveStrategyStd";
import { IoCScopeTreeContainer } from "../../ex5/IoCScopeTreeContainer";
import { CommandMoveLinear } from "../../ex[2-4]/common/commands";
import { CommandBurnFuel } from "../../ex[2-4]/common/commands/CommandBurnFuel";
import { CommandLog } from "../../ex[2-4]/common/commands/common";
import { SimpleLogger } from "../../ex[2-4]/common/commands/common/CommandLog";
import { SpaceshipFuelTankBurnStrategy } from "../../ex[2-4]/common/strategies/SpaceshipFuelTankBurnStrategy";
import { ICommand } from "../../ex[2-4]/Core/Command";
import { RotationVelocityVec } from "../../ex[2-4]/Core/IRotationVelocity";
import { Vector2 } from "../../ex[2-4]/Core/IVector";
import { VelocityVec } from "../../ex[2-4]/Core/IVelocity";
import { MovableGameEntity } from "../../ex[2-4]/Entity";
import { SpaceshipFuelTank } from "../../ex[2-4]/Entity/common/fuelTanks";
import { SpaceShip } from "../../ex[2-4]/Entity/SpaceShip/SpaceShip";
/**
 * Не получится передать в поток данные привычным образом, есть существенные ограничения.
 * Можно передать данные, но не ф-и, поэтому будем передавать некие
 * инструкции и создавать команды "на лету". Для простоты танные создадим прямо в ф-ях
 */

new CommandIoCBootstrap(
  new IoCScopeTreeContainer(new IoCDependencyContainer(), "root"),
  new IoCResolveStrategyStd()
).execute();

const cmdsDefs = [
  {
    name: "log",
    data: 1,
    cb: (data) => new CommandLog(new SimpleLogger()).log(data),
  },
  {
    name: "burnFuel",
    data: (function () {
      return { fuel: 10, loc: [0, 0], rotVel: [0], vel: [1, 0] };
    })(),
    cb: ({ fuel, loc, rotVel, vel }) => {
      const strat = new SpaceshipFuelTankBurnStrategy();
      const tank = new SpaceshipFuelTank(fuel, strat);
      strat.bind(tank);
      const simpleSpaceShip = new SpaceShip(
        tank,
        new Vector2(loc),
        new RotationVelocityVec(rotVel),
        new VelocityVec(new Vector2(vel))
      );
      return new CommandBurnFuel().burnFuel(simpleSpaceShip);
    },
  },
  {
    name: "moveLinear",
    data: (function () {
      return { loc: [12, 5], vel: [-7, 3] };
    })(),
    cb: ({ loc, vel }) => {
      const simpleSpaceShip = new MovableGameEntity(
        new Vector2(loc),
        new VelocityVec(new Vector2(vel))
      );
      return new CommandMoveLinear().moveLinear(simpleSpaceShip);
    },
  },
];

cmdsDefs.forEach((cmd) => IoC.resolve("register")(cmd.name, cmd.cb));

const cmdsDefs4Testing = [
  {
    name: "cmd1",
    data: null,
    cb: () => {
      class Cmd1 implements ICommand {
        execute() {
          console.log(Cmd1);
        }
      }
      return new Cmd1();
    },
  },
  {
    name: "cmd2",
    data: null,
    cb: () => {
      class Cmd2 implements ICommand {
        execute() {
          console.log(Cmd2);
        }
      }
      return new Cmd2();
    },
  },
  {
    name: "withError",
    data: null,
    cb: () => {
      class CmdWithErr implements ICommand {
        execute() {
          throw Error("some err");
        }
      }
      return new CmdWithErr();
    },
  },
];

cmdsDefs4Testing.forEach((cmd) => IoC.resolve("register")(cmd.name, cmd.cb));

export const getRandomCmdDef = () => cmdsDefs[Math.trunc(Math.random() * 3)];
export const getCmdsDef4Testing = () => cmdsDefs4Testing;
export const getIoCThread = () => IoC;
