"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotatableGameEntity = void 0;
var RotatableGameEntity = /** @class */ (function () {
    function RotatableGameEntity(newRotationVel, newVelocity) {
        this.rotationVelocity = newRotationVel;
        this.velocity = newVelocity;
    }
    RotatableGameEntity.prototype.setRotationVelocity = function (newRotation) {
        this.rotationVelocity = newRotation;
    };
    RotatableGameEntity.prototype.setVelocity = function (newVelocity) {
        this.velocity = newVelocity;
    };
    return RotatableGameEntity;
}());
exports.RotatableGameEntity = RotatableGameEntity;
