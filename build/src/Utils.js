"use strict";
function isUndefined(item) {
    return (typeof item) === 'undefined';
}
exports.isUndefined = isUndefined;
function isNull(item) {
    return item === null;
}
exports.isNull = isNull;
function isDefinedNotNull(item) {
    return !isUndefined(item) && !isNull(item);
}
exports.isDefinedNotNull = isDefinedNotNull;
function areEqual(a, b) {
    return a === b;
}
exports.areEqual = areEqual;
//# sourceMappingURL=Utils.js.map