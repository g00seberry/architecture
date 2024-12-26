"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotationVelocityVec = exports.RotationVelocity2D = void 0;
var utils_1 = require("../utils");
var IVector_1 = require("./IVector");
var IVelocity_1 = require("./IVelocity");
var RotationVelocity2D = /** @class */ (function () {
    function RotationVelocity2D(newEul) {
        this.eul = newEul;
    }
    RotationVelocity2D.prototype.rotate = function (src) {
        return new IVelocity_1.Velocity2D(src.velocityMod, src.angleDeg + this.eul[0]);
    };
    return RotationVelocity2D;
}());
exports.RotationVelocity2D = RotationVelocity2D;
var RotationVelocityVec = /** @class */ (function () {
    function RotationVelocityVec(newEul) {
        this.eul = newEul;
    }
    Object.defineProperty(RotationVelocityVec.prototype, "rotationMtx", {
        get: function () {
            var eul = this.eul;
            return [
                [Math.cos((0, utils_1.degrees2Radians)(eul[0])), -Math.sin((0, utils_1.degrees2Radians)(eul[0]))],
                [Math.sin((0, utils_1.degrees2Radians)(eul[0])), Math.cos((0, utils_1.degrees2Radians)(eul[0]))],
            ];
        },
        enumerable: false,
        configurable: true
    });
    RotationVelocityVec.prototype.rotate = function (src) {
        var mtx = this.rotationMtx;
        var coords = src.getVelocityVector().coords;
        return new IVelocity_1.VelocityVec(new IVector_1.Vector2([
            coords[0] * mtx[0][0] + coords[1] * mtx[0][1],
            coords[0] * mtx[1][0] + coords[1] * mtx[1][1],
        ]));
    };
    return RotationVelocityVec;
}());
exports.RotationVelocityVec = RotationVelocityVec;
