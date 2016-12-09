/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import LinkedList from "../src/datastructures/LinkedList";
import { expect } from 'chai';

describe('LinkedList', () => {
    var subject : LinkedList<number>;

    beforeEach(function () {
        subject = new LinkedList<number>();
    });

    describe('#add', () => {
        it('should add two numbers to the list', (done) => {
            subject.add(1);
            subject.add(2);
            expect(subject.count).to.equal(2);
            done();
        });

        it('should add create a list of range 1..5 then insert the value 7 at index 2', (done)=>{
            for(var i = 0; i < 5; i++){
                subject.add(i);
            }
            expect(subject.elementAt(2)).to.equal(2);
            subject.addAt(7, 2);
            expect(subject.elementAt(2)).to.equal(7);
            done();
        });
    });

    describe('#remove', ()=>{
        it('should remove an item from  the list',(done)=>{
            subject.add(1);
            expect(subject.count).to.equal(1);
            subject.remove(1);
            expect(subject.count).to.equal(0);
            done();
        });
    });
});

