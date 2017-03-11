import {hashCode} from "hashcode";
import LinkedList from "./LinkedList";
import * as _ from "lodash";
import * as Utils from "../Utils";

export class Dictionary<TKey, TValue>{
    /**
     * Returns the number of elements in this dictionary.
     */
    public get length():number{
        return this._length;
    }

    /**
     * Returns the current capacity of this dictionary.
     */
    public get capacity():number{
        return this._capacity;
    }

    /**
     * Returns an array of the keys stored in this dictionary.
     */
    public get keys(): TKey[]{
        return this.getKeys();
    }

    /**
     * Returns an array of the values stored in this dictionary.
     */
    public get values(): TValue[]{
        return this.getValues();
    }

    /**
     * Returns an array of the Entries in this dictionary.
     */
    public get entries(): Entry<TKey, TValue>[]{
        return this.getEntries();
    }

    private _entries: LinkedList<Entry<TKey,TValue>>[];
    private _length: number;
    private _capacity: number;

    /**
     * Creates a new Dictionary object.
     * @param {number} initialCapacity The number of elements that can be added before the inner array is resized.
     */
    public constructor(initialCapacity: number = 10){
        this._entries = new Array(initialCapacity);
        this._capacity = initialCapacity;
        this._length = 0;
    }
    
    /**
     * Adds a new entry to this Dictionary.
     * @param {TKey} key The key to index this object by.
     * @param {Tvalue} value The value to store.
     * @returns {number} The new length of the dictionary.
     */
    public add(key:TKey, value: TValue): number{
        
        if(this.length === this._entries.length){
            this.resize();
        }
        let entry = new Entry<TKey,TValue>(key, value, this.getHash(key));
        if(!Utils.isDefinedNotNull(this._entries[entry.hashCode])){
            this._entries[entry.hashCode] = new LinkedList<Entry<TKey,TValue>>();
        }
        this._entries[entry.hashCode].add(entry);
        this._length++;
        return this.length;
    }

    /**
     * Adds a new {Entry} key-value pair object to the dictionary.
     * @param {Entry} entry The object to add.
     * @returns {number} The new length of the dictionary.
     */
    public addEntry(entry: Entry<TKey,TValue>): number{
        return this.add(entry.key, entry.value);
    }

    /**
     * Gets the value indexed by the given key.
     * @param {TKey} key The index to get the value of.
     * @returns {TValue} The value at the provided keys index.
     */
    public get(key: TKey): TValue{
        if(this._entries[this.getHash(key)].count === 1){
            return this._entries[this.getHash(key)].elementAt(0).value;
        }
        let retVal: TValue = undefined;
        this._entries[this.getHash(key)].forEach((element: Entry<TKey,TValue>)=>{
            if(Utils.isDefinedNotNull(retVal)){return;}
            if(_.isEqual(element.key, key)){
                retVal = element.value;
            }
        });
        return retVal;
    }

    /**
     * Returns the {Entry} object associated with a key.
     * @param {TKey} key The key to get the Entry of.
     * @returns {Entry} The Entry object associated with the given key.
     */
    public getEntry(key: TKey): Entry<TKey,TValue>{
        if(this._entries[this.getHash(key)].count === 1){
            return this._entries[this.getHash(key)].elementAt(0);
        }
        let retVal: Entry<TKey,TValue> = undefined;
        this._entries[this.getHash(key)].forEach((element: Entry<TKey,TValue>)=>{
            if(!Utils.isDefinedNotNull(retVal)){return;}
            if(_.isEqual(element, key)){
                retVal = element;
            }
        });
        return retVal;
    }

    /**
     * Checks if the Dictionary contains an entry with the provided key.
     * @param {TKey} key The key to search for.
     * @returns {boolean} True if this Dictionary contains a key.
     */
    public containsKey(key: TKey): boolean{
        return Utils.isDefinedNotNull(this._entries[this.getHash(key)]) &&
            Utils.isDefinedNotNull(this.getEntry(key));
    }

    /**
     * Checks if a value exists in the dictionary.
     * @param {TValue} value The value to search for.
     * @returns {boolean} True if the value exists, otherwise false.
     */
    public containsValue(value: TValue): boolean{
        let doesContain = false;
        this._entries.forEach((bucket)=>{
            if(!Utils.isDefinedNotNull(bucket)){return};
            if(bucket.count === 1 && bucket.elementAt(0).value == value){
                doesContain = true;
            }else{
                bucket.forEach((element)=>{
                    if(element.value === value){
                        doesContain = true;
                    }
                });
            }
        });
        return doesContain;
    }

    /**
     * Gets the first key associated with the given value.
     * @param {TValue} value The value to find the key of.
     * @returns {TKey} The first key associated with the provided value.
     */
    public getFirstKeyForValue(value: TValue): TKey{
        let key: TKey = null;
        this._entries.forEach((bucket)=>{
            if(!Utils.isDefinedNotNull(bucket)){return};
            if(bucket.count === 1 && bucket.elementAt(0).value == value){
                key = bucket.elementAt(0).key;
            }else{
                bucket.forEach((element)=>{
                    if(element.value === value){
                        key = element.key;
                    }
                });
            }
        });
        return key;
    }

    /**
     * Removes an {Entry} from this Dictionary.
     * @param {TKey} key The key of the Entry to remove.
     * @returns {boolean} True if an Entry was removed, otherwise false.
     */
    public remove(key: TKey): boolean{
        let hashCode = this.getHash(key);
        if(!Utils.isDefinedNotNull(this._entries[hashCode])){
            return false;
        }
        this._entries[hashCode].remove(this.getEntry(key))
        this._length--;
        return true;
    }

    /**
     * String representation of this object.
     */
    public toString(): string{
        return this._entries.toString();
    }

    /**
     * Resizes the inner array by a factor of 2.
     */
    protected resize(){
        this._capacity *= 2;
        this._entries.length = this._capacity;
        this._entries.forEach((bucket: LinkedList<Entry<TKey,TValue>>) => {
            bucket.forEach((element: Entry<TKey,TValue>)=>{
                let tmp = element;
                this.remove(element.key)
                tmp.hashCode = this.getHash(element.key);
                if(!Utils.isDefinedNotNull(this._entries[tmp.hashCode])){
                    this._entries[tmp.hashCode] = new LinkedList<Entry<TKey,TValue>>();
                }
                this._entries[tmp.hashCode].add(tmp);
                this._length++;
            });
        });
        return this.length;
    }

    /**
     * Hashes the key, converting it to a position in the inner array.
     * @param {TKey} item The item to hash.
     */
    protected getHash(item: TKey): number{
        return 1;// Math.abs(hashCode().value(item)) % this._entries.length;
    }

    protected getKeys(): TKey[]{
        let arr: TKey[] = new Array();
        this._entries.forEach((bucket: LinkedList<Entry<TKey,TValue>>)=>{
            if(Utils.isDefinedNotNull(bucket)){
                bucket.forEach((element:Entry<TKey,TValue>)=>{
                    arr.push(element.key);
                });
            }
        });
        return arr;
    }

    protected getValues(): TValue[]{
        let arr: TValue[] = new Array();
        this._entries.forEach((bucket: LinkedList<Entry<TKey,TValue>>)=>{
            if(Utils.isDefinedNotNull(bucket)){
                bucket.forEach((element: Entry<TKey,TValue>)=>{
                    arr.push(element.value);
                });
            }
        });
        return arr;
    }

    protected getEntries(){
        let arr: Entry<TKey, TValue>[] = new Array();
        this._entries.forEach((bucket: LinkedList<Entry<TKey,TValue>>)=>{
            if(Utils.isDefinedNotNull(bucket)){
                bucket.forEach((element: Entry<TKey,TValue>)=>{
                    arr.push(element);
                });
            }
        });
        return arr;
    }
}


export class Entry<TKey, TValue>{
    /**
     * The position to store this Entry at.
     */
    public hashCode: number;
    /**
     * The key for this object.
     */
    public readonly key: TKey;
    /**
     * The value of this object.
     */
    public readonly value: TValue;

    /**
     * Creates a new Entry object.
     * @param {Tkey} key The key to use for indexing.
     * @param {TValue} value The value to be stored.
     * @param {number} hashCode The position of this object in its parent array.
     */
    public constructor(key: TKey, value: TValue, hashCode:number){
        this.key = key;
        this.value = value;
        this.hashCode = hashCode;
    }

    public toString(){
        return "[key: "+this.key+", value: "+this.value+"]"
    }
}
