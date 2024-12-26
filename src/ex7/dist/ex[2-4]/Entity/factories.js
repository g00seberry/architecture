"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryRotatableEntity = exports.FactoryMovableEntity = void 0;
var _1 = require(".");
var FactoryMovableEntity = /** @class */ (function () {
    function FactoryMovableEntity(data) {
        this.source = data;
    }
    FactoryMovableEntity.prototype.produce = function () {
        return this.source.map(function (_a) {
            var l = _a[0], v = _a[1];
            return new _1.MovableGameEntity(l, v);
        });
    };
    return FactoryMovableEntity;
}());
exports.FactoryMovableEntity = FactoryMovableEntity;
var FactoryRotatableEntity = /** @class */ (function () {
    function FactoryRotatableEntity(data) {
        this.source = data;
    }
    FactoryRotatableEntity.prototype.produce = function () {
        return this.source.map(function (_a) {
            var l = _a[0], v = _a[1];
            return new _1.RotatableGameEntity(l, v);
        });
    };
    return FactoryRotatableEntity;
}());
exports.FactoryRotatableEntity = FactoryRotatableEntity;
