"use strict";
var utils = require("./TestUtil");
var Stack_1 = require("../src/datastructures/Stack");
var chai_1 = require("chai");
describe('Stack', function () {
    var subject;
    beforeEach(function () {
        subject = new Stack_1.default();
    });
    describe("Stack behaviors", function () {
        it("should create a new stack of max size 5", function (done) {
            subject = new Stack_1.default(5);
            utils.addRange(subject, 0, 7);
            chai_1.expect(subject.count).to.equal(5);
            done();
        });
        it("should return -1 if pushing to a full stack", function (done) {
            subject = new Stack_1.default(5);
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.push(3)).to.equal(-1);
            done();
        });
        it("should pop the last element from the stack", function (done) {
            utils.addRange(subject, 0, 7);
            chai_1.expect(subject.count).to.equal(8);
            chai_1.expect(subject.pop()).to.equal(7);
            chai_1.expect(subject.count).to.equal(7);
            done();
        });
        it("should push a new element to the stack", function (done) {
            chai_1.expect(subject.push(5)).to.equal(1);
            chai_1.expect(subject.peek()).to.equal(5);
            done();
        });
        it("should create a string representing the stack", function (done) {
            utils.addRange(subject, 0, 3);
            chai_1.expect(subject.toString()).to.equal("[0,1,2,3]");
            done();
        });
    });
});
//# sourceMappingURL=Stack.js.map