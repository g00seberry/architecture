"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRotateVelocity = void 0;
var ExceptionCmd_1 = require("../../ExceptionHandlerCmd/ExceptionCmd");
/**
 * пока что объект представлен в виде положения в пространстве и скорости,
 * поэтому вращение есть смысл производить только в контексте поворота направления движения,
 * то есть поворачивать вектор скорости
 */
var CommandRotateVelocity = /** @class */ (function () {
    function CommandRotateVelocity() {
        this.entity = null;
    }
    CommandRotateVelocity.prototype.rotateVelocity = function (gameEnt) {
        this.entity = gameEnt;
        return this;
    };
    CommandRotateVelocity.prototype.execute = function () {
        if (!this.entity)
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Entity is empty. Can`t perform CommandRotateVelocity command.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        if (!("rotationVelocity" in this.entity) ||
            !("velocity" in this.entity) ||
            !("setVelocity" in this.entity))
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Wrong entity type. Can`t perform CommandRotateVelocity command.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        var ent = this.entity;
        var rotation = ent.rotationVelocity, velocity = ent.velocity;
        if (!(rotation && velocity))
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Wrong rotation or velocity.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        ent.setVelocity(rotation.rotate(velocity));
    };
    return CommandRotateVelocity;
}());
exports.CommandRotateVelocity = CommandRotateVelocity;
