"use strict";
var Utils = require("../Utils");
var Set = (function () {
    function Set(range) {
        this._innerArray = new Array();
        if (!Utils.isUndefined(range)) {
            this._innerArray = range.slice(0);
        }
    }
    Object.defineProperty(Set.prototype, "count", {
        get: function () {
            return this._innerArray.length;
        },
        enumerable: true,
        configurable: true
    });
    Set.prototype.contains = function (item, comparer) {
        var cmp = this.defaultOrCustomEqualityCheck(comparer);
        return this._innerArray.indexOf(item) >= 0;
    };
    Set.prototype.add = function (item, comparer) {
        this.insert(item, comparer);
    };
    Set.prototype.insert = function (item, comparer) {
        if (!this.contains(item, comparer)) {
            this._innerArray.push(item);
        }
    };
    Set.prototype.remove = function (item, comparer) {
        var index = this.indexOf(item);
        if (this.contains(item, comparer) && index >= 0) {
            this._innerArray.splice(index, 1);
        }
    };
    Set.prototype.union = function (other, inline) {
        if (inline === void 0) { inline = false; }
        var newSet = inline ? this : new Set(this._innerArray.slice(0));
        other.forEach(function (element) {
            if (!(newSet.indexOf(element) >= 0)) {
                newSet.insert(element);
            }
        });
        return newSet;
    };
    Set.prototype.difference = function (other, inline) {
        if (inline === void 0) { inline = false; }
        return this.subtract(other, inline);
    };
    Set.prototype.subtract = function (other, inline) {
        if (inline === void 0) { inline = false; }
        var newSet = inline ? this : new Set(this._innerArray.slice(0));
        other.forEach(function (element) {
            if ((newSet.indexOf(element) >= 0)) {
                newSet.remove(element);
            }
        });
        return newSet;
    };
    Set.prototype.intersection = function (other, inline) {
        var _this = this;
        if (inline === void 0) { inline = false; }
        var newSet = new Set();
        other.forEach(function (element) {
            if (_this.contains(element)) {
                newSet.add(element);
            }
        });
        if (inline) {
            this._innerArray = newSet.toArray();
        }
        return inline ? this : newSet;
    };
    Set.prototype.indexOf = function (item, comparer) {
        if (Utils.isUndefined(item)) {
            return -2;
        }
        var cmp = this.defaultOrCustomEqualityCheck(comparer);
        for (var x = 0; x < this._innerArray.length; x++) {
            if (cmp(this._innerArray[x], item)) {
                return x;
            }
        }
        return -1;
    };
    Set.prototype.forEach = function (callback) {
        this._innerArray.forEach((function (ele) {
            callback(ele);
        }));
    };
    Set.prototype.toArray = function () {
        return this._innerArray.slice(0);
    };
    Set.prototype.toString = function () {
        return "[" + this.toArray().toString() + "]";
    };
    Set.prototype.isEmpty = function () {
        return Utils.areEqual(this._innerArray.length, 0);
    };
    Set.prototype.defaultOrCustomEqualityCheck = function (comparer) {
        return !Utils.isUndefined(comparer) ?
            comparer : function (a, b) { return a === b; };
    };
    return Set;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Set;
//# sourceMappingURL=Set.js.map