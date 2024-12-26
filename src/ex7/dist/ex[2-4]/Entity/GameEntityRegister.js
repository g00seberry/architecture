"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntityRegister = exports.GameEntityRegisterList = void 0;
/**
 * Хреновое решение, но пока что так, чтобы не задерживаться.
 */
var GameEntityRegisterList = /** @class */ (function () {
    function GameEntityRegisterList() {
        this.pool = [];
    }
    GameEntityRegisterList.prototype.registerEntity = function (ent) {
        if (this.pool.find(function (e) { return e === ent; }))
            return;
        this.pool.push(ent);
    };
    GameEntityRegisterList.prototype.unregister = function (ent) {
        var e = this.pool.find(function (e) { return e === ent; });
        if (!!e)
            this.pool = this.pool.filter(function (e) { return e !== ent; });
        return e;
    };
    GameEntityRegisterList.prototype.list = function () {
        return this.pool;
    };
    return GameEntityRegisterList;
}());
exports.GameEntityRegisterList = GameEntityRegisterList;
var getEntityRegister = function () { return new GameEntityRegisterList(); };
exports.getEntityRegister = getEntityRegister;
