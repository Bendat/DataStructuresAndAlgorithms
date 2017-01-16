"use strict";
var utils = require("./TestUtil");
var LinkedList_1 = require("../src/datastructures/LinkedList");
var chai_1 = require("chai");
describe('LinkedList', function () {
    var subject;
    beforeEach(function () {
        subject = new LinkedList_1.default();
    });
    describe('Search functions, [elementAt, indexOf, contains]', function () {
        it('should return the value at a given index', function (done) {
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.elementAt(1)).to.equal(1);
            chai_1.expect(subject.elementAt(3)).to.equal(3);
            done();
        });
        it('should return the index of a given value', function (done) {
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.indexOf(3)).to.equal(3);
            done();
        });
        it('should return true if the list contains a given element', function (done) {
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.contains(1)).to.be.true;
            done();
        });
        it('should return false if the list does not contain a given element', function (done) {
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.contains(15)).to.be.false;
            done();
        });
    });
    describe('Add functions, [add, addAt]', function () {
        it('should add two numbers to the list.', function (done) {
            subject.add(1);
            subject.add(2);
            chai_1.expect(subject.count).to.equal(2);
            done();
        });
        it('should add an item at a specified index.', function (done) {
            utils.addRange(subject, 0, 5);
            chai_1.expect(subject.elementAt(2)).to.equal(2);
            subject.addAt(7, 2);
            chai_1.expect(subject.elementAt(2)).to.equal(7);
            done();
        });
    });
    describe('Delete functions, [remove, removeAt, clearAll]', function () {
        it('should remove an item from the list.', function (done) {
            subject.add(1);
            chai_1.expect(subject.count).to.equal(1);
            chai_1.expect(subject.remove(1)).to.be.true;
            chai_1.expect(subject.count).to.equal(0);
            done();
        });
        it("should return false when removing a non-existing item", function (done) {
            chai_1.expect(subject.remove(1)).to.be.false;
            done();
        });
        it('should remove an item at a specified index.', function (done) {
            utils.addRange(subject, 0, 4);
            chai_1.expect(subject.elementAt(1)).to.equal(1);
            chai_1.expect(subject.removeAt(1)).to.equal(1);
            chai_1.expect(subject.count).to.equal(4);
            chai_1.expect(subject.elementAt(1)).to.equal(2);
            chai_1.expect(subject.removeAt(2)).to.equal(3);
            done();
        });
        it('should clear the linked list of its contents', function (done) {
            utils.addRange(subject, 0, 5);
            chai_1.expect(subject.count).to.equal(6);
            subject.clearAll();
            chai_1.expect(subject.count).to.equal(0);
            done();
        });
    });
    describe("Utility functions, [sort, toString, toArray, forEach]", function () {
        it("should sort the list", function (done) {
            subject.add(2);
            subject.add(5);
            subject.add(1);
            subject.add(11);
            chai_1.expect(subject.sort().toArray()).to.deep.equal([1, 2, 5, 11]);
            done();
        });
    });
});
//# sourceMappingURL=LinkedList.js.map