"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovableGameEntity = void 0;
var MovableGameEntity = /** @class */ (function () {
    function MovableGameEntity(newLocation, newVelocity) {
        this.location = newLocation;
        this.velocity = newVelocity;
    }
    MovableGameEntity.prototype.setLocation = function (newLocation) {
        this.location = newLocation;
    };
    return MovableGameEntity;
}());
exports.MovableGameEntity = MovableGameEntity;
