"use strict";
var Dictionary_1 = require("../src/datastructures/Dictionary");
var chai_1 = require("chai");
describe('Dictionary', function () {
    var subject;
    beforeEach(function () {
        subject = new Dictionary_1.Dictionary(5);
    });
    describe('Dictionary behaviors.', function () {
        it("Should add an entry to the dictionary", function (done) {
            subject.add("1", 1);
            chai_1.expect(subject.length).to.equal(1);
            done();
        });
        it("should add 5 entries to the dictionary", function (done) {
            subject.add("1", 1);
            subject.add("2", 1);
            subject.add("3", 1);
            subject.add("4", 1);
            subject.add("5", 1);
            chai_1.expect(subject.length).to.equal(5);
            done();
        });
        it.skip("should add 6 entries to the dictionary, increasing capacity.", function (done) {
            chai_1.expect(subject.capacity).to.equal(5);
            subject.add("1", 1);
            subject.add("2", 1);
            subject.add("3", 1);
            subject.add("4", 1);
            subject.add("5", 1);
            subject.add("6", 1);
            chai_1.expect(subject.length).to.equal(6);
            chai_1.expect(subject.capacity).to.equal(10);
            done();
        });
        it("should get a value by its key", function (done) {
            subject.add("1", 1);
            chai_1.expect(subject.get("1")).to.equal(1);
            done();
        });
        it("should check if the dictionary contains a key", function (done) {
            subject.add("1", 1);
            chai_1.expect(subject.containsKey("1")).to.be.true;
            done();
        });
        it("should check if the dictionary contains a value", function (done) {
            subject.add("1", 1);
            chai_1.expect(subject.containsValue(1)).to.be.true;
            done();
        });
        it("should get the first key associated with a provided value.", function (done) {
            subject.add("1", 1);
            chai_1.expect(subject.getFirstKeyForValue(1)).to.equal("1");
            done();
        });
        it("should remove a value from the dictionary", function (done) {
            subject.add("1", 1);
            subject.add("2", 1);
            subject.remove("1");
            chai_1.expect(subject.length).to.equal(1);
            chai_1.expect(subject.containsKey("1")).to.be.false;
            done();
        });
    });
});
//# sourceMappingURL=Dictionary.js.map