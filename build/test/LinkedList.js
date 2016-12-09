"use strict";
var LinkedList_1 = require("../src/datastructures/LinkedList");
var chai_1 = require("chai");
describe('LinkedList', function () {
    var subject;
    beforeEach(function () {
        subject = new LinkedList_1.default();
    });
    describe('#add', function () {
        it('should add two numbers to the list', function (done) {
            subject.add(1);
            subject.add(2);
            chai_1.expect(subject.count).to.equal(2);
            done();
        });
        it('should add create a list of range 1..5 then insert the value 7 at index 2', function (done) {
            for (var i = 0; i < 5; i++) {
                subject.add(i);
            }
            chai_1.expect(subject.elementAt(2)).to.equal(2);
            subject.addAt(7, 2);
            chai_1.expect(subject.elementAt(2)).to.equal(7);
            done();
        });
    });
    describe('#remove', function () {
        it('should remove an item from  the list', function (done) {
            subject.add(1);
            chai_1.expect(subject.count).to.equal(1);
            subject.remove(1);
            chai_1.expect(subject.count).to.equal(0);
            done();
        });
    });
});
//# sourceMappingURL=LinkedList.js.map