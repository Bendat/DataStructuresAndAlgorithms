/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import * as utils from "./TestUtil";
import Stack from "../src/datastructures/Stack";
import { expect } from 'chai';

describe('Stack', () => {
    var subject : Stack<number>;

    beforeEach(function () {
        subject = new Stack<number>();
    });

    describe("Stack behaviors", ()=>{
        it("should create a new stack of max size 5", (done)=>{
            subject = new Stack<number>(5);
            utils.addRange(subject, 0,7);
            expect(subject.count).to.equal(5);
            done();
        });

        it("should return -1 if pushing to a full stack", (done)=>{
            subject = new Stack<number>(5);
            utils.addRange(subject, 0,4);
            expect(subject.push(3)).to.equal(-1);
            done();
        });

        it("should pop the last element from the stack", (done)=>{
            utils.addRange(subject, 0,7);
            expect(subject.count).to.equal(8);
            expect(subject.pop()).to.equal(7);
            expect(subject.count).to.equal(7);
            done();
        });

        it("should push a new element to the stack", (done)=>{
            expect(subject.push(5)).to.equal(1);
            expect(subject.peek()).to.equal(5);
            done();
        });

        it("should create a string representing the stack", (done)=>{
            utils.addRange(subject, 0,3);
            expect(subject.toString()).to.equal("[0,1,2,3]");
            done();
        });
        
    });
});