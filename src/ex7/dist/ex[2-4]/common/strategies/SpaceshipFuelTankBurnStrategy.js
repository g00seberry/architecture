"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceshipFuelTankBurnStrategy = void 0;
var ExceptionCmd_1 = require("../../ExceptionHandlerCmd/ExceptionCmd");
var SpaceshipFuelTankBurnStrategy = /** @class */ (function () {
    function SpaceshipFuelTankBurnStrategy() {
    }
    SpaceshipFuelTankBurnStrategy.prototype.bind = function (tank) {
        this.tank = tank;
    };
    SpaceshipFuelTankBurnStrategy.prototype.execute = function () {
        if (!this.tank)
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Can`t execute SpaceshipFuelTankBurnStrategy", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        var fuel = this.tank.getFuelLevel();
        if (fuel > 0)
            return fuel - 1;
        return fuel;
    };
    return SpaceshipFuelTankBurnStrategy;
}());
exports.SpaceshipFuelTankBurnStrategy = SpaceshipFuelTankBurnStrategy;
