"use strict";
var Utils = require("../Utils");
var QuickSort = (function () {
    function QuickSort(array, comparator) {
        this._innerArray = array;
        this._comparator = this.defaultOrCustomComparator(comparator);
    }
    QuickSort.prototype.sort = function (left, right) {
        var pivot = null;
        var newPivot = null;
        if (!Utils.isDefinedNotNull(left)) {
            left = 0;
        }
        if (!Utils.isDefinedNotNull(right)) {
            right = this._innerArray.length - 1;
        }
        if (left < right) {
            pivot = left + Math.ceil((right - left) * 0.5);
            newPivot = this.partition(pivot, left, right);
            this.sort(left, newPivot - 1);
            this.sort(newPivot + 1, right);
        }
        return this._innerArray;
    };
    QuickSort.prototype.swap = function (first, second) {
        var temp = this._innerArray[first];
        this._innerArray[first] = this._innerArray[second];
        this._innerArray[second] = temp;
    };
    QuickSort.prototype.partition = function (pivot, left, right) {
        var storeIndex = left;
        var pivotValue = this._innerArray[pivot];
        this.swap(pivot, right);
        for (var i = left; i < right; i++) {
            if (this._comparator(this._innerArray[i], pivotValue) == -1) {
                this.swap(i, storeIndex);
                storeIndex++;
            }
        }
        this.swap(right, storeIndex);
        return storeIndex;
    };
    QuickSort.prototype.defaultOrCustomComparator = function (comparator) {
        return Utils.isDefinedNotNull(comparator) ?
            comparator :
            function (a, b) { return a == b ? 0 : a < b ? -1 : 1; };
    };
    return QuickSort;
}());
exports.QuickSort = QuickSort;
//# sourceMappingURL=QuickSort.js.map