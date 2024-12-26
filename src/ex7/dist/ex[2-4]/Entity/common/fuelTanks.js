"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceshipFuelTank = void 0;
var SpaceshipFuelTank = /** @class */ (function () {
    function SpaceshipFuelTank(fuel, burnStrategy) {
        this.fuel = fuel;
        this.burnStrategy = burnStrategy;
    }
    SpaceshipFuelTank.prototype.getFuelLevel = function () {
        return this.fuel;
    };
    SpaceshipFuelTank.prototype.burn = function () {
        this.fuel = this.burnStrategy.execute();
    };
    return SpaceshipFuelTank;
}());
exports.SpaceshipFuelTank = SpaceshipFuelTank;
