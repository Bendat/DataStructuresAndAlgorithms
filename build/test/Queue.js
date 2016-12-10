"use strict";
var utils = require("./TestUtil");
var Queue_1 = require("../src/datastructures/Queue");
var chai_1 = require("chai");
describe('Queue', function () {
    var subject;
    beforeEach(function () {
        subject = new Queue_1.default();
    });
    describe("Queuebehaviors", function () {
        it("should create a new Queueof max size 5", function (done) {
            subject = new Queue_1.default(5);
            utils.addRange(subject, 0, 7);
            chai_1.expect(subject.count).to.equal(5);
            done();
        });
        it("should return -1 if enqueueing to a full queue", function (done) {
            subject = new Queue_1.default(5);
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.enqueue(3)).to.equal(-1);
            done();
        });
        it("should dequeue the first element from the queue", function (done) {
            utils.addRange(subject, 0, 7);
            chai_1.expect(subject.count).to.equal(8);
            chai_1.expect(subject.dequeue()).to.equal(0);
            chai_1.expect(subject.count).to.equal(7);
            done();
        });
        it("should enqueue a new element to the queue", function (done) {
            chai_1.expect(subject.enqueue(5)).to.equal(1);
            chai_1.expect(subject.front()).to.equal(5);
            done();
        });
        it("should create a string representing the queue", function (done) {
            utils.addRange(subject, 0, 3);
            chai_1.expect(subject.toString()).to.equal("[0,1,2,3]");
            done();
        });
    });
});
//# sourceMappingURL=Queue.js.map