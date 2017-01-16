/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import * as utils from "./TestUtil";
import Set from "../src/datastructures/Set";
import { expect } from 'chai';

describe('Set', () => {
    var subject: Set<number>;
    
    beforeEach(function () {
        subject = new Set<number>();
    });

    describe("Set Behaviors", ()=>{
        it("Should insert 5 items into the set", (done)=>{
            utils.addRange(subject, 0, 4);
            expect(subject.count).to.equal(5);
            done();
        });

        it("should remove an item from the set", (done)=>{
            utils.addRange(subject, 0, 4);
            expect(subject.count).to.equal(5);
            subject.remove(3);
            expect(subject.count).to.equal(4);
            done();
        });

        it("should form a union between two sets", (done)=>{
            utils.addRange(subject, 0, 4);
            let setTwo = new Set<number>([3,4,5]);
            expect(subject.union(setTwo).toArray()).to.deep.equal([0,1,2,3,4,5]);
            done();
        });

        it("should perform a difference between two sets", (done)=>{
            utils.addRange(subject, 0, 4);
            let setTwo = new Set<number>([3,4,5]);
            expect(subject.difference(setTwo).toArray()).to.deep.equal([0,1,2]);
            done();
        });

        it("should perform an intersection between two sets", (done)=>{
            utils.addRange(subject, 0, 4);
            let setTwo = new Set<number>([3,4,5]);
            expect(subject.intersection(setTwo).toArray()).to.deep.equal([3,4]);
            done();
        });

        
    });

});