"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIoCThread = exports.getCmdsDef4Testing = exports.getRandomCmdDef = void 0;
var IoC_1 = require("../../ex5/IoC");
var IoCDependencyContainer_1 = require("../../ex5/IoCDependencyContainer");
var IoCResolveStrategyStd_1 = require("../../ex5/IoCResolveStrategyStd");
var IoCScopeTreeContainer_1 = require("../../ex5/IoCScopeTreeContainer");
var commands_1 = require("../../ex[2-4]/common/commands");
var CommandBurnFuel_1 = require("../../ex[2-4]/common/commands/CommandBurnFuel");
var common_1 = require("../../ex[2-4]/common/commands/common");
var CommandLog_1 = require("../../ex[2-4]/common/commands/common/CommandLog");
var SpaceshipFuelTankBurnStrategy_1 = require("../../ex[2-4]/common/strategies/SpaceshipFuelTankBurnStrategy");
var IRotationVelocity_1 = require("../../ex[2-4]/Core/IRotationVelocity");
var IVector_1 = require("../../ex[2-4]/Core/IVector");
var IVelocity_1 = require("../../ex[2-4]/Core/IVelocity");
var Entity_1 = require("../../ex[2-4]/Entity");
var fuelTanks_1 = require("../../ex[2-4]/Entity/common/fuelTanks");
var SpaceShip_1 = require("../../ex[2-4]/Entity/SpaceShip/SpaceShip");
/**
 * Не получится передать в поток данные привычным образом, есть существенные ограничения.
 * Можно передать данные, но не ф-и, поэтому будем передавать некие
 * инструкции и создавать команды "на лету". Для простоты танные создадим прямо в ф-ях
 */
new IoC_1.CommandIoCBootstrap(new IoCScopeTreeContainer_1.IoCScopeTreeContainer(new IoCDependencyContainer_1.IoCDependencyContainer(), "root"), new IoCResolveStrategyStd_1.IoCResolveStrategyStd()).execute();
var cmdsDefs = [
    {
        name: "log",
        data: 1,
        cb: function (data) { return new common_1.CommandLog(new CommandLog_1.SimpleLogger()).log(data); },
    },
    {
        name: "burnFuel",
        data: (function () {
            return { fuel: 10, loc: [0, 0], rotVel: [0], vel: [1, 0] };
        })(),
        cb: function (_a) {
            var fuel = _a.fuel, loc = _a.loc, rotVel = _a.rotVel, vel = _a.vel;
            var strat = new SpaceshipFuelTankBurnStrategy_1.SpaceshipFuelTankBurnStrategy();
            var tank = new fuelTanks_1.SpaceshipFuelTank(fuel, strat);
            strat.bind(tank);
            var simpleSpaceShip = new SpaceShip_1.SpaceShip(tank, new IVector_1.Vector2(loc), new IRotationVelocity_1.RotationVelocityVec(rotVel), new IVelocity_1.VelocityVec(new IVector_1.Vector2(vel)));
            return new CommandBurnFuel_1.CommandBurnFuel().burnFuel(simpleSpaceShip);
        },
    },
    {
        name: "moveLinear",
        data: (function () {
            return { loc: [12, 5], vel: [-7, 3] };
        })(),
        cb: function (_a) {
            var loc = _a.loc, vel = _a.vel;
            var simpleSpaceShip = new Entity_1.MovableGameEntity(new IVector_1.Vector2(loc), new IVelocity_1.VelocityVec(new IVector_1.Vector2(vel)));
            return new commands_1.CommandMoveLinear().moveLinear(simpleSpaceShip);
        },
    },
];
cmdsDefs.forEach(function (cmd) { return IoC_1.IoC.resolve("register")(cmd.name, cmd.cb); });
var cmdsDefs4Testing = [
    {
        name: "cmd1",
        data: null,
        cb: function () {
            var Cmd1 = /** @class */ (function () {
                function Cmd1() {
                }
                Cmd1.prototype.execute = function () {
                    console.log(Cmd1);
                };
                return Cmd1;
            }());
            return new Cmd1();
        },
    },
    {
        name: "cmd2",
        data: null,
        cb: function () {
            var Cmd2 = /** @class */ (function () {
                function Cmd2() {
                }
                Cmd2.prototype.execute = function () {
                    console.log(Cmd2);
                };
                return Cmd2;
            }());
            return new Cmd2();
        },
    },
    {
        name: "withError",
        data: null,
        cb: function () {
            var CmdWithErr = /** @class */ (function () {
                function CmdWithErr() {
                }
                CmdWithErr.prototype.execute = function () {
                    throw Error("some err");
                };
                return CmdWithErr;
            }());
            return new CmdWithErr();
        },
    },
];
cmdsDefs4Testing.forEach(function (cmd) { return IoC_1.IoC.resolve("register")(cmd.name, cmd.cb); });
var getRandomCmdDef = function () { return cmdsDefs[Math.trunc(Math.random() * 3)]; };
exports.getRandomCmdDef = getRandomCmdDef;
var getCmdsDef4Testing = function () { return cmdsDefs4Testing; };
exports.getCmdsDef4Testing = getCmdsDef4Testing;
var getIoCThread = function () { return IoC_1.IoC; };
exports.getIoCThread = getIoCThread;
