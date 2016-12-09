"use strict";
var Utils = require("../Utils");
var LinkedList = (function () {
    function LinkedList() {
        var _this = this;
        this._firstNode = null;
        this._lastNode = null;
        this._count = 0;
        this.indexRange = function () { return { start: 0, end: _this._count - 1 }; };
    }
    Object.defineProperty(LinkedList.prototype, "firstElement", {
        get: function () {
            return Utils.isNull(this._firstNode) ? undefined : this._firstNode.element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "lastElement", {
        get: function () {
            return Utils.isNull(this._lastNode) ? undefined : this._lastNode.element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    ;
    LinkedList.prototype.add = function (item) {
        var index = this._count;
        return this.addAt(item, index);
    };
    LinkedList.prototype.addAt = function (item, index) {
        if (!this.isValidIndex || Utils.isUndefined(item)) {
            return false;
        }
        var newNode = this.createNode(item);
        if (Utils.areEqual(this._count, 0)) {
            this._firstNode = newNode;
            this._lastNode = newNode;
        }
        else if (Utils.areEqual(index, 0)) {
            newNode.next = this._firstNode;
            this._firstNode = newNode;
        }
        else if (Utils.areEqual(index, this._count)) {
            this._lastNode.next = newNode;
            this._lastNode = newNode;
        }
        else {
            var previous = this.nodeAt(index - 1);
            newNode.next = previous.next;
            previous.next = newNode;
        }
        this._count++;
        return true;
    };
    LinkedList.prototype.remove = function (item, comparer) {
        var equalityCheck = this.defaultOrCustomEqualityCheck(comparer);
        if (!this.isValidIndex) {
            return false;
        }
        var previousNode = null;
        var currentNode = this._firstNode;
        while (!Utils.isNull(currentNode)) {
            if (equalityCheck(currentNode.element, item)) {
                this.removeNode(currentNode, previousNode);
                this._count--;
                return true;
            }
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    };
    LinkedList.prototype.removeAt = function (index) {
        if (!this.isValidIndex(index)) {
            return undefined;
        }
        var element;
        if (Utils.areEqual(this._count, 1)) {
            element = this._firstNode.element;
            this._firstNode = null;
            this._lastNode = null;
        }
        else {
            var previousNode = this.nodeAt(index - 1);
            if (Utils.isNull(previousNode)) {
                element = this._firstNode.element;
                this._firstNode = this._firstNode.next;
            }
            else if (Utils.areEqual(previousNode.next, this._lastNode)) {
                element = this._lastNode.element;
                this._lastNode = previousNode;
            }
            if (!Utils.isNull(previousNode)) {
                element = previousNode.next.element;
                previousNode.next = previousNode.next.next;
            }
        }
        this._count--;
        return element;
    };
    LinkedList.prototype.clearAll = function () {
        this._firstNode = null;
        this._lastNode = null;
        this._count = 0;
    };
    LinkedList.prototype.elementAt = function (index) {
        var node = this.nodeAt(index);
        return Utils.isNull(node) ? undefined : node.element;
    };
    LinkedList.prototype.indexOf = function (item, comparer) {
        if (Utils.isUndefined(item)) {
            return -1;
        }
        var equalityCheck = this.defaultOrCustomEqualityCheck(comparer);
        var currNode = this._firstNode;
        var index = 0;
        while (currNode !== null) {
            if (equalityCheck(currNode.element, item)) {
                return index;
            }
            currNode = currNode.next;
            index++;
        }
        return -1;
    };
    LinkedList.prototype.contains = function (item, comparer) {
        var equalityCheck = this.defaultOrCustomEqualityCheck(comparer);
        return !Utils.areEqual(this.indexOf(item, comparer), -1);
    };
    LinkedList.prototype.forEach = function (callBack) {
        var currentNode = this._firstNode;
        while (!Utils.isNull(currentNode)) {
            callBack(currentNode.element);
            currentNode = currentNode.next;
        }
    };
    LinkedList.prototype.isEmpty = function () {
        return this._count === 0;
    };
    LinkedList.prototype.toArray = function () {
        var array = [];
        var currentNode = this._firstNode;
        while (!Utils.isNull(currentNode)) {
            array.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return array;
    };
    LinkedList.prototype.toString = function () {
        return "[" + this.toArray().toString() + "]";
    };
    LinkedList.prototype.removeNode = function (currentNode, previousNode) {
        if (Utils.areEqual(currentNode, this._firstNode)) {
            this._firstNode = this._firstNode.next;
            if (Utils.areEqual(currentNode, this._lastNode)) {
                this._lastNode = null;
            }
        }
        else if (Utils.areEqual(currentNode, this._lastNode)) {
            this._lastNode = previousNode;
            previousNode.next = currentNode.next;
            currentNode = null;
        }
        else {
            previousNode.next = currentNode.next;
            currentNode.next = null;
        }
    };
    LinkedList.prototype.defaultOrCustomEqualityCheck = function (comparer) {
        return !Utils.isUndefined(comparer) ?
            comparer : function (a, b) { return a === b; };
    };
    LinkedList.prototype.createNode = function (item) {
        return {
            element: item,
            next: null,
        };
    };
    LinkedList.prototype.nodeAt = function (index) {
        if (!this.isValidIndex(index)) {
            return null;
        }
        switch (index) {
            case 0: return this._firstNode;
            case this._count: return this._lastNode;
        }
        var node = this._firstNode;
        var pos = 0;
        for (var i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    };
    LinkedList.prototype.isValidIndex = function (index) {
        return index >= 0 && index < this._count;
    };
    return LinkedList;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LinkedList;
//# sourceMappingURL=LinkedList.js.map