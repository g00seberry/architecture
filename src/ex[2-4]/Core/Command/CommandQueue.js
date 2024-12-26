"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandQueue = exports.CommandQueue = void 0;
var CommandQueue = /** @class */ (function () {
    function CommandQueue() {
        this.list = [];
    }
    CommandQueue.prototype.enqueue = function (item) {
        this.list.push(item);
    };
    CommandQueue.prototype.dequeue = function () {
        return this.list.shift();
    };
    CommandQueue.prototype.isEmpty = function () {
        return this.list.length === 0;
    };
    return CommandQueue;
}());
exports.CommandQueue = CommandQueue;
var getCommandQueue = function () { return new CommandQueue(); };
exports.getCommandQueue = getCommandQueue;
