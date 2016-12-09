/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import * as utils from "./TestUtil";
import LinkedList from "../src/datastructures/LinkedList";
import { expect } from 'chai';

describe('LinkedList', () => {
    var subject : LinkedList<number>;

    beforeEach(function () {
        subject = new LinkedList<number>();
    });

    describe('Search functions, [elementAt, indexOf, contains]', () =>{
        it('should return the value at a given index', (done)=>{
            utils.addRange(subject, 0, 4);
            expect(subject.elementAt(1)).to.equal(1);
            expect(subject.elementAt(3)).to.equal(3);
            done();
        });

        it('should return the index of a given value', (done)=>{
            utils.addRange(subject, 0, 4);
            expect(subject.indexOf(3)).to.equal(3);
            done();
        });

        it('should return true if the list contains a given element',(done)=>{
            utils.addRange(subject, 0, 4);
            expect(subject.contains(1)).to.equal(true);
            done();
        });

        it('should return false if the list does not contain a given element',(done)=>{
            utils.addRange(subject, 0, 4);
            expect(subject.contains(15)).to.equal(false);
            done();
        });

    });

    describe('Add functions, [add, addAt]', () => {
        it('should add two numbers to the list.', (done) => {
            subject.add(1);
            subject.add(2);
            expect(subject.count).to.equal(2);
            done();
        });

        it('should add an item at a specified index.', (done)=>{
            utils.addRange(subject, 0, 5);
            expect(subject.elementAt(2)).to.equal(2);
            subject.addAt(7, 2);
            expect(subject.elementAt(2)).to.equal(7);
            done();
        });
    });

    describe('Delete functions, [remove, removeAt, clearAll]', ()=>{
        it('should remove an item from the list.', (done)=>{
            subject.add(1);
            expect(subject.count).to.equal(1);
            expect(subject.remove(1)).to.equal(true);
            expect(subject.count).to.equal(0);
            done();
        });

        it("should return false when removing a non-existing item", (done)=>{
            expect(subject.remove(1)).to.equal(false);
            done();
        });

        it('should remove an item at a specified index.', (done)=>{
            utils.addRange(subject, 0, 4);
            expect(subject.elementAt(1)).to.equal(1);
            expect(subject.removeAt(1)).to.equal(1);
            expect(subject.count).to.equal(4);
            expect(subject.elementAt(1)).to.equal(2);
            expect(subject.removeAt(2)).to.equal(3);
            done();
        });

        it('should clear the linked list of its contents', (done)=>{
            utils.addRange(subject, 0, 5);
            expect(subject.count).to.equal(6);
            subject.clearAll();
            expect(subject.count).to.equal(0);
            done();
        });
    });

    describe("Utility functions, [toString, toArray, forEach]", ()=>{
        //TODO
    });
});

