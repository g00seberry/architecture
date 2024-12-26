"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMoveLinear = void 0;
var ExceptionCmd_1 = require("../../ExceptionHandlerCmd/ExceptionCmd");
var CommandMoveLinear = /** @class */ (function () {
    function CommandMoveLinear() {
        this.entity = null;
    }
    CommandMoveLinear.prototype.moveLinear = function (gameEnt) {
        this.entity = gameEnt;
        return this;
    };
    CommandMoveLinear.prototype.execute = function () {
        if (!this.entity)
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Unconsistent data. Can`t perform CommandMoveLinear command.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        if (!("location" in this.entity) ||
            !("velocity" in this.entity) ||
            !("setLocation" in this.entity))
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Wrong entity type. Can`t perform CommandMoveLinear command.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        var ent = this.entity;
        var location = ent.location, velocity = ent.velocity;
        if (!(location && velocity))
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Wrong location or velocity.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        ent.setLocation(location.add(velocity.getVelocityVector()));
    };
    return CommandMoveLinear;
}());
exports.CommandMoveLinear = CommandMoveLinear;
