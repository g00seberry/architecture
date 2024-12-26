"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
var IEventQueue_1 = require("./IEventQueue");
var BootIoC_1 = require("./BootIoC");
var eventQueue = [];
var postBack = function (data) {
    eventQueue.push(data);
    worker_threads_1.parentPort.postMessage(eventQueue);
};
var threadId = worker_threads_1.workerData.threadId;
var isLoopActive = false;
var queue = (0, IEventQueue_1.createEventQueue)();
var IoCThread = (0, BootIoC_1.getIoCThread)();
var CommandRunThread = /** @class */ (function () {
    function CommandRunThread() {
    }
    CommandRunThread.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // отправялем обратно для тестирования --> поток запущен
                        postBack({ threadId: threadId, type: "started" });
                        isLoopActive = true;
                        _a.label = 1;
                    case 1:
                        if (!isLoopActive) return [3 /*break*/, 8];
                        command = queue.dequeue();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        if (!command) return [3 /*break*/, 3];
                        command.execute();
                        // отправялем обратно для тестирования --> команда выполнена
                        postBack({
                            cmdName: command.constructor.name,
                            type: "executed",
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        // отправялем обратно для тестирования --> ошибка выполнения
                        postBack({
                            cmdName: command.constructor.name,
                            type: "error",
                        });
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return CommandRunThread;
}());
var CommandSoftStop = /** @class */ (function () {
    function CommandSoftStop() {
        this.isLoopActive = false;
    }
    CommandSoftStop.prototype.execute = function () {
        while (!queue.isEmpty()) {
            var command = queue.dequeue();
            try {
                command === null || command === void 0 ? void 0 : command.execute();
                // отправялем обратно для тестирования --> команда выполнена
                postBack({
                    cmdName: command.constructor.name,
                    type: "executed during soft stop",
                });
            }
            catch (error) {
                // отправялем обратно для тестирования --> ошибка выполнения
                postBack({
                    cmdName: command.constructor.name,
                    type: "error during soft stop",
                });
            }
        }
        postBack("softStop");
        process.exit(0);
    };
    return CommandSoftStop;
}());
var CommandHardStop = /** @class */ (function () {
    function CommandHardStop() {
    }
    CommandHardStop.prototype.execute = function () {
        isLoopActive = false;
        postBack("hardStop");
        process.exit(0);
    };
    return CommandHardStop;
}());
IoCThread.resolve("register")("hardStop", function () { return new CommandHardStop(); });
IoCThread.resolve("register")("softStop", function () { return new CommandSoftStop(); });
var systemCommands = new Set(["hardStop", "softStop"]);
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on("message", function (msg) {
    var cmd = IoCThread.resolve(msg.type)(msg.data);
    if (systemCommands.has(msg.type)) {
        cmd.execute();
    }
    else {
        queue.enqueue(cmd);
    }
});
new CommandRunThread().execute();
