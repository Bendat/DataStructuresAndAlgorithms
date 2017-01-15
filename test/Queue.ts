/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import * as utils from "./TestUtil";
import Queue from "../src/datastructures/Queue";
import { expect } from 'chai';

describe('Queue', () => {
    var subject : Queue<number>;

    beforeEach(function () {
        subject = new Queue<number>();
    });

    describe("Queuebehaviors", ()=>{
        it("should create a new Queueof max size 5", (done)=>{
            subject = new Queue<number>(5);
            utils.addRange(subject, 0,7);
            expect(subject.count).to.equal(5);
            done();
        });

        it("should return -1 if enqueueing to a full queue", (done)=>{
            subject = new Queue<number>(5);
            utils.addRange(subject, 0,4);
            expect(subject.enqueue(3)).to.equal(-1);
            done();
        });

        it("should dequeue the first element from the queue", (done)=>{
            utils.addRange(subject, 0, 7);
            expect(subject.count).to.equal(8);
            expect(subject.dequeue()).to.equal(0);
            expect(subject.count).to.equal(7);
            done();
        });

        it("should enqueue a new element to the queue", (done)=>{
            expect(subject.enqueue(5)).to.equal(1);
            expect(subject.front()).to.equal(5);
            done();
        });

        it("should create a string representing the queue", (done)=>{
            utils.addRange(subject, 0,3);
            expect(subject.toString()).to.equal("[0,1,2,3]");
            done();
        });
        
    });
});