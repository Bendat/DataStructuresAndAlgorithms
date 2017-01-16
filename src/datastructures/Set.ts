import * as Utils from "../Utils";
import * as Compare from "./interfaces/Comparable";
import * as bnds from "../Enums/Bounds";

export default class Set<T>{
    private _innerArray: T[] = new Array();

    /**
     * The number of items in the set.
     */
    public get count(): number{
        return this._innerArray.length;
    }

    /**
     * Creates a new queue object.
     * @param {number=} maxSize - The maximum number of elements the queue can contain.
     */
    public constructor(range?: T[]){
        if(!Utils.isUndefined(range)){
            this._innerArray = range.slice(0)
        }
    }

    /**
     * Checks if this Set contains the given item.
     * @param {T} item - the element to check the existence of.
     * @param {Function=} comparer - Function compare objects in the list. Defaults to ===.
     * @return {boolean} True if this Set contains the item, otherwise false. 
     */
    public contains(item: T, comparer?: Function): boolean{
        var cmp = this.defaultOrCustomEqualityCheck(comparer);
        return this._innerArray.indexOf(item) >= 0;
    }

    /**
     * Inserts the item into the set. Does nothing if the set contains the value already.
     * Alias of inser().
     */
    public add(item: T, comparer?: Function): void{
        this.insert(item, comparer);
    }

    /**
     * Inserts the item into the set. Does nothing if the set contains the value already.
     */
    public insert(item: T, comparer?: Function): void{
        if(!this.contains(item, comparer)){
            this._innerArray.push(item);
        }
    }

    /**
     * Removes the given item from the Set, if it exists.
     */
    public remove(item: T, comparer?: Function): void{
        let index = this.indexOf(item)
        if(this.contains(item, comparer) && index >= 0){
           this._innerArray.splice(index, 1);
        }
    }

    /**
     * Creates a new set, or modifies the existing set, such that it contains all the elements
     * of the current and provided set.
     * @param {Set<T>} other - The other set to form a union with.
     * @param {boolean=} inline - Whether or not to modify the current Set object inline or
     * simply return a new Set of the result.
     */
    public union(other: Set<T>, inline = false): Set<T>{
        let newSet: Set<T> = inline? this: new Set<T>(this._innerArray.slice(0));
        other.forEach((element)=>{
            if(!(newSet.indexOf(element)>=0)){

                newSet.insert(element);
            }
        });
        return newSet;
    }

    /**
     * Returns a new set, or modifies the existing set, such that it contains only elements unique
     * to the current set. Alias of subtract.
     * @param {Set<T>} other - The other set to form a union with.
     * @param {boolean=} inline - Whether or not to modify the current Set object inline or
     * simply return a new Set of the result.
     * @return {Set<T>} the subtracted set.
     */
    public difference(other:Set<T>, inline = false): Set<T>{
        return this.subtract(other, inline);
    }

    /**
     * Returns a new set, or modifies the existing set, such that it contains only elements unique
     * to the current set.
     * @param {Set<T>} other - The other set to form a union with.
     * @param {boolean=} inline - Whether or not to modify the current Set object inline or
     * simply return a new Set of the result.
     * @return {Set<T>} the subtracted set.
     */
    public subtract(other:Set<T>, inline = false):Set<T>{
        var newSet: Set<T> = inline? this: new Set<T>(this._innerArray.slice(0));
        other.forEach((element)=>{
            if((newSet.indexOf(element)>=0)){
                newSet.remove(element);
            }
        });
        return newSet;
    }

    /**
     * Returns a new set, or modifies the existing set, such that it contains only elements common
     * to the current and provided sets.
     * @param {Set<T>} other - The other set to form a union with.
     * @param {boolean=} inline - Whether or not to modify the current Set object inline or
     * simply return a new Set of the result.
     * @return {Set<T>} the intersected set.
     */
    public intersection(other:Set<T>, inline = false):Set<T>{
        var newSet: Set<T> = new Set<T>();

        other.forEach((element)=>{
            if(this.contains(element)){
                newSet.add(element);
            }
        });
        if(inline){
            this._innerArray = newSet.toArray();
        }
        return inline ? this : newSet;  
    }

    public indexOf(item: T, comparer?: Function): number{
        if(Utils.isUndefined(item)) {return -2;}
        var cmp = this.defaultOrCustomEqualityCheck(comparer);
        for (let x = 0; x < this._innerArray.length; x++) {
            if(cmp(this._innerArray[x], item)){return x}
        }
        return -1;
    }

    public forEach(callback: Function):void{
        this._innerArray.forEach((ele=>{
            callback(ele);
        }));
    }

    public toArray():T[]{
        return this._innerArray.slice(0);
    }

    public toString():string{
        return "["+this.toArray().toString()+"]"
    }

    /**
     * Indicates whether the Set is empty.
     * @return {boolean} true if the set contains no elements, otherwise false.
     */
    public isEmpty():boolean{
        return Utils.areEqual(this._innerArray.length, 0)
    }

    /**@private */
    private defaultOrCustomEqualityCheck(comparer?: Function): Function{
        return !Utils.isUndefined(comparer)  ? 
               comparer : (a:T, b:T):boolean => {return a === b;}
    }
    
}