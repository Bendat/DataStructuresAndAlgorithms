"use strict";
var utils = require("./TestUtil");
var Set_1 = require("../src/datastructures/Set");
var chai_1 = require("chai");
describe.only('Set', function () {
    var subject;
    beforeEach(function () {
        subject = new Set_1.default();
    });
    describe("Set Behaviors", function () {
        it("Should insert 5 items into the set", function (done) {
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.count).to.equal(5);
            done();
        });
        it("should remove an item from the set", function (done) {
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.count).to.equal(5);
            subject.remove(3);
            chai_1.expect(subject.count).to.equal(4);
            done();
        });
        it("should form a union between two sets", function (done) {
            utils.addRange(subject, 0, 4);
            var setTwo = new Set_1.default([3, 4, 5]);
            chai_1.expect(subject.union(setTwo).toArray()).to.deep.equal([0, 1, 2, 3, 4, 5]);
            done();
        });
        it("should perform a difference between two sets", function (done) {
            utils.addRange(subject, 0, 4);
            var setTwo = new Set_1.default([3, 4, 5]);
            chai_1.expect(subject.difference(setTwo).toArray()).to.deep.equal([0, 1, 2]);
            done();
        });
        it("should perform an intersection between two sets", function (done) {
            utils.addRange(subject, 0, 4);
            var setTwo = new Set_1.default([3, 4, 5]);
            chai_1.expect(subject.intersection(setTwo).toArray()).to.deep.equal([3, 4]);
            done();
        });
    });
});
//# sourceMappingURL=Set.js.map