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
        for (var _i = 0, _a = this._innerArray; _i < _a.length; _i++) {
            var element = _a[_i];
            if (cmp(item, element)) {
                return true;
            }
        }
        return false;
    };
    Set.prototype.add = function (item) {
        this.insert(item);
    };
    Set.prototype.insert = function (item) {
        if (!this.contains(item)) {
            this._innerArray.push(item);
        }
    };
    Set.prototype.remove = function (item) {
        if (!this.contains(item)) {
            this._innerArray.splice(this._innerArray.indexOf(item), 1);
        }
    };
    Set.prototype.union = function (other, inline) {
        if (inline === void 0) { inline = false; }
        var newSet = inline ? this : new Set(this._innerArray.splice(0));
        newSet.forEach(function (element) {
            newSet.insert(element);
        });
        return newSet;
    };
    Set.prototype.difference = function (other, inline) {
        if (inline === void 0) { inline = false; }
        return this.subtract(other, inline);
    };
    Set.prototype.subtract = function (other, inline) {
        if (inline === void 0) { inline = false; }
        var newSet = inline ? this : new Set(this._innerArray.splice(0));
        newSet.forEach(function (element) {
            newSet.remove(element);
        });
        return newSet;
    };
    Set.prototype.intersection = function (other, inline) {
        if (inline === void 0) { inline = false; }
        var newSet = inline ? this : new Set(this._innerArray.splice(0));
        newSet.forEach(function (element) {
            if (!other.contains(element)) {
                newSet.remove(element);
            }
        });
        return newSet;
    };
    Set.prototype.forEach = function (callback) {
        this._innerArray.forEach((function (ele) {
            callback(ele);
        }));
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