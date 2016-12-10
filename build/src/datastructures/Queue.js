"use strict";
var Utils = require("../Utils");
var bnds = require("../Enums/Bounds");
var Queue = (function () {
    function Queue(maxSize) {
        this.DEFAULT_SIZE = Infinity;
        this._innerArray = new Array();
        if (Utils.isUndefined(maxSize)) {
            this._maxSize = this.DEFAULT_SIZE;
        }
        else {
            this._maxSize = maxSize;
        }
    }
    Object.defineProperty(Queue.prototype, "maxSize", {
        get: function () {
            return this._maxSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "count", {
        get: function () {
            return this._innerArray.length;
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.add = function (item) {
        return this.enqueue(item);
    };
    Queue.prototype.enqueue = function (item) {
        if (this._innerArray.length < this._maxSize) {
            return this._innerArray.push(item);
        }
        return bnds.Bounds.Full;
    };
    Queue.prototype.dequeue = function () {
        return this._innerArray.shift();
    };
    Queue.prototype.front = function () {
        return this._innerArray[0];
    };
    Queue.prototype.isEmpty = function () {
        return Utils.areEqual(this.count, bnds.Bounds.Empty);
    };
    Queue.prototype.isFull = function () {
        return Utils.areEqual(this.count, this._maxSize);
    };
    Queue.prototype.toArray = function () {
        return this._innerArray.slice(0);
    };
    Queue.prototype.toString = function () {
        return "[" + this.toArray().toString() + "]";
    };
    return Queue;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Queue;
//# sourceMappingURL=Queue.js.map