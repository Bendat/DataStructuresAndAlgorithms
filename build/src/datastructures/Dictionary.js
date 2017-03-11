"use strict";
var LinkedList_1 = require("./LinkedList");
var _ = require("lodash");
var Utils = require("../Utils");
var Dictionary = (function () {
    function Dictionary(initialCapacity) {
        if (initialCapacity === void 0) { initialCapacity = 10; }
        this._entries = new Array(initialCapacity);
        this._capacity = initialCapacity;
        this._length = 0;
    }
    Object.defineProperty(Dictionary.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "capacity", {
        get: function () {
            return this._capacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "keys", {
        get: function () {
            return this.getKeys();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "values", {
        get: function () {
            return this.getValues();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "entries", {
        get: function () {
            return this.getEntries();
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.add = function (key, value) {
        if (this.length === this._entries.length) {
            this.resize();
        }
        var entry = new Entry(key, value, this.getHash(key));
        if (!Utils.isDefinedNotNull(this._entries[entry.hashCode])) {
            this._entries[entry.hashCode] = new LinkedList_1.default();
        }
        this._entries[entry.hashCode].add(entry);
        this._length++;
        return this.length;
    };
    Dictionary.prototype.addEntry = function (entry) {
        return this.add(entry.key, entry.value);
    };
    Dictionary.prototype.get = function (key) {
        if (this._entries[this.getHash(key)].count === 1) {
            return this._entries[this.getHash(key)].elementAt(0).value;
        }
        var retVal = undefined;
        this._entries[this.getHash(key)].forEach(function (element) {
            if (Utils.isDefinedNotNull(retVal)) {
                return;
            }
            if (_.isEqual(element.key, key)) {
                retVal = element.value;
            }
        });
        return retVal;
    };
    Dictionary.prototype.getEntry = function (key) {
        if (this._entries[this.getHash(key)].count === 1) {
            return this._entries[this.getHash(key)].elementAt(0);
        }
        var retVal = undefined;
        this._entries[this.getHash(key)].forEach(function (element) {
            if (!Utils.isDefinedNotNull(retVal)) {
                return;
            }
            if (_.isEqual(element, key)) {
                retVal = element;
            }
        });
        return retVal;
    };
    Dictionary.prototype.containsKey = function (key) {
        return Utils.isDefinedNotNull(this._entries[this.getHash(key)]) &&
            Utils.isDefinedNotNull(this.getEntry(key));
    };
    Dictionary.prototype.containsValue = function (value) {
        var doesContain = false;
        this._entries.forEach(function (bucket) {
            if (!Utils.isDefinedNotNull(bucket)) {
                return;
            }
            ;
            if (bucket.count === 1 && bucket.elementAt(0).value == value) {
                doesContain = true;
            }
            else {
                bucket.forEach(function (element) {
                    if (element.value === value) {
                        doesContain = true;
                    }
                });
            }
        });
        return doesContain;
    };
    Dictionary.prototype.getFirstKeyForValue = function (value) {
        var key = null;
        this._entries.forEach(function (bucket) {
            if (!Utils.isDefinedNotNull(bucket)) {
                return;
            }
            ;
            if (bucket.count === 1 && bucket.elementAt(0).value == value) {
                key = bucket.elementAt(0).key;
            }
            else {
                bucket.forEach(function (element) {
                    if (element.value === value) {
                        key = element.key;
                    }
                });
            }
        });
        return key;
    };
    Dictionary.prototype.remove = function (key) {
        var hashCode = this.getHash(key);
        if (!Utils.isDefinedNotNull(this._entries[hashCode])) {
            return false;
        }
        this._entries[hashCode].remove(this.getEntry(key));
        this._length--;
        return true;
    };
    Dictionary.prototype.toString = function () {
        return this._entries.toString();
    };
    Dictionary.prototype.resize = function () {
        var _this = this;
        this._capacity *= 2;
        this._entries.length = this._capacity;
        this._entries.forEach(function (bucket) {
            bucket.forEach(function (element) {
                var tmp = element;
                _this.remove(element.key);
                tmp.hashCode = _this.getHash(element.key);
                if (!Utils.isDefinedNotNull(_this._entries[tmp.hashCode])) {
                    _this._entries[tmp.hashCode] = new LinkedList_1.default();
                }
                _this._entries[tmp.hashCode].add(tmp);
                _this._length++;
            });
        });
        return this.length;
    };
    Dictionary.prototype.getHash = function (item) {
        return 1;
    };
    Dictionary.prototype.getKeys = function () {
        var arr = new Array();
        this._entries.forEach(function (bucket) {
            if (Utils.isDefinedNotNull(bucket)) {
                bucket.forEach(function (element) {
                    arr.push(element.key);
                });
            }
        });
        return arr;
    };
    Dictionary.prototype.getValues = function () {
        var arr = new Array();
        this._entries.forEach(function (bucket) {
            if (Utils.isDefinedNotNull(bucket)) {
                bucket.forEach(function (element) {
                    arr.push(element.value);
                });
            }
        });
        return arr;
    };
    Dictionary.prototype.getEntries = function () {
        var arr = new Array();
        this._entries.forEach(function (bucket) {
            if (Utils.isDefinedNotNull(bucket)) {
                bucket.forEach(function (element) {
                    arr.push(element);
                });
            }
        });
        return arr;
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
var Entry = (function () {
    function Entry(key, value, hashCode) {
        this.key = key;
        this.value = value;
        this.hashCode = hashCode;
    }
    Entry.prototype.toString = function () {
        return "[key: " + this.key + ", value: " + this.value + "]";
    };
    return Entry;
}());
exports.Entry = Entry;
//# sourceMappingURL=Dictionary.js.map