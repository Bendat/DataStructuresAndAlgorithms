/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import * as utils from "./TestUtil";
import {Dictionary} from "../src/datastructures/Dictionary";
import { expect } from 'chai';
describe('Dictionary', () => {
    var subject : Dictionary<string, number>;

    beforeEach(function () {
        subject = new Dictionary<string, number>(5);
    });

    describe('Dictionary behaviors.', () =>{
        it("Should add an entry to the dictionary", (done)=>{
            subject.add("1", 1);
            expect(subject.length).to.equal(1);
            done()
        });
        
        it("should add 5 entries to the dictionary", (done)=>{
            subject.add("1", 1);
            subject.add("2", 1);
            subject.add("3", 1);
            subject.add("4", 1);
            subject.add("5", 1);
            expect(subject.length).to.equal(5);
            done()
        });

        it("should add 6 entries to the dictionary, increasing capacity.", (done)=>{
            expect(subject.capacity).to.equal(5);
            subject.add("1", 1);
            subject.add("2", 1);
            subject.add("3", 1);
            subject.add("4", 1);
            subject.add("5", 1);
            subject.add("6", 1);
            expect(subject.length).to.equal(6);
            expect(subject.capacity).to.equal(10);
            done()
        });

        it("should get a value by its key", (done)=>{
            subject.add("1", 1);
            expect(subject.get("1")).to.equal(1);
            done();
        });

        it("should check if the dictionary contains a key", (done)=>{
            subject.add("1", 1);
            expect(subject.containsKey("1")).to.be.true;
            done();
        });
        
        it("should check if the dictionary contains a value", (done)=>{
            subject.add("1", 1);
            expect(subject.containsValue(1)).to.be.true;
            done();
        })

        it("should get the first key associated with a provided value.", (done)=>{
            subject.add("1", 1);
            expect(subject.getFirstKeyForValue(1)).to.equal("1");
            done();
        })

        it("should remove a value from the dictionary", (done)=>{
            subject.add("1", 1);
            subject.add("2", 1);
            subject.remove("1");
            expect(subject.length).to.equal(1);
            expect(subject.containsKey("1")).to.be.false;
            done();
        });
    });
});
