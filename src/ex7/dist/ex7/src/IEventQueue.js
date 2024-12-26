"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventQueue = exports.EventQueueSimple = void 0;
var EventQueueSimple = /** @class */ (function () {
    function EventQueueSimple() {
        this.arr = [];
    }
    EventQueueSimple.prototype.dequeue = function () {
        return this.arr.shift();
    };
    EventQueueSimple.prototype.enqueue = function (data) {
        this.arr.push(data);
    };
    EventQueueSimple.prototype.isEmpty = function () {
        return this.arr.length === 0;
    };
    return EventQueueSimple;
}());
exports.EventQueueSimple = EventQueueSimple;
var createEventQueue = function () {
    return new EventQueueSimple();
};
exports.createEventQueue = createEventQueue;
