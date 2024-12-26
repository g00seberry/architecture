"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandProduceEntities = void 0;
var ExceptionCmd_1 = require("../../ExceptionHandlerCmd/ExceptionCmd");
var CommandProduceEntities = /** @class */ (function () {
    function CommandProduceEntities() {
        this.factory = null;
        this.entityReg = null;
    }
    CommandProduceEntities.prototype.produceEntities = function (newFactory, newEntityReg) {
        this.factory = newFactory;
        this.entityReg = newEntityReg;
        return this;
    };
    CommandProduceEntities.prototype.execute = function () {
        var _this = this;
        if (!this.factory || !this.entityReg)
            throw (0, ExceptionCmd_1.makeExceptionCmd)("factory or entityReg is null. Can`t perform CommandProduceMovableEntities command.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        this.factory.produce().forEach(function (e) { return _this.entityReg.registerEntity(e); });
    };
    return CommandProduceEntities;
}());
exports.CommandProduceEntities = CommandProduceEntities;
