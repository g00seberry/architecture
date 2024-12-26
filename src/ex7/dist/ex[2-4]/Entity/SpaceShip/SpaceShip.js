"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceShip = void 0;
var SpaceShip = /** @class */ (function () {
    function SpaceShip(fuelTank, location, rotationVelocity, velocity) {
        this.fuelTank = fuelTank;
        this.location = location;
        this.rotationVelocity = rotationVelocity;
        this.velocity = velocity;
    }
    SpaceShip.prototype.setFuelTank = function (fuelTank) {
        this.fuelTank = fuelTank;
    };
    SpaceShip.prototype.setLocation = function (newLocation) {
        this.location = newLocation;
    };
    SpaceShip.prototype.setRotationVelocity = function (newRotation) {
        this.rotationVelocity = newRotation;
    };
    SpaceShip.prototype.setVelocity = function (newVelocity) {
        this.velocity = newVelocity;
    };
    return SpaceShip;
}());
exports.SpaceShip = SpaceShip;
