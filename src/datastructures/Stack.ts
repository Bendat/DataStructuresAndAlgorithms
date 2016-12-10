import * as Utils from "../Utils";
import * as Compare from "./interfaces/Comparable";
export default class Stack<T>{
    private readonly DEFAULT_SIZE:number = Infinity;
    private _innerArray: T[] = new Array();
    private _maxSize: number;
    public get maxSize(){
        return this._maxSize;
    }
    /**
     * The number of items in the stack.
     */
    public get count(){
        return this._innerArray.length;
    }

    /**
     * Creates a new stack object.
     * @param {number=} maxSize - The maximum number of elements the stack can contain.
     */
    public constructor(maxSize?:number){
        if(Utils.isUndefined(maxSize)){
            this._maxSize = this.DEFAULT_SIZE;
        }else{
            this._maxSize = maxSize;
        }
    }
        
    /**
     * Removes the last element in the stack and returns it.
     * @return {T} The element removed from the stack.
     */
    public pop(): T{
        if(!Utils.areEqual(this.count, Bounds.Empty)){
            return this._innerArray.pop();
        }
        return null;
    }

    /**
     * Adds a new item to the top of the stack. Alias for push().
     * @return {number} The new size of the stack, or the enum member Bounds.Empty (i.e -1).
     */
    public add(item: T):number{
        return this.push(item);
    }

    /**
     * Adds a new item to the top of the stack.
     * @return {number} The new size of the stack, or the enum member Bounds.Empty (i.e -1).
     */
    public push(item: T):number{
        if(this._innerArray.length < this._maxSize){
            return this._innerArray.push(item);
        }
        return Bounds.Full;
    }

    /**
     * Returns the last element of the stack without removing it.
     * @return {T} The last element in the stack.
     */
    public peek(): T{
        return this._innerArray[this._innerArray.length - 1];
    }

    /**
     * Returns whether or not the stack has any contents.
     * @return {boolean}
     */
    public isEmpty():boolean{
        return Utils.areEqual(this.count, Bounds.Empty);
    }

    /**
     * Returns whether or not the stack can add any more elements.
     * @return {boolean}
     */
    public isFull(): boolean{
        return Utils.areEqual(this.count, this._maxSize);
    }
    public toArray(): T[]{
        return JSON.parse(JSON.stringify(this._innerArray));
    }

    public toString(): string {
        return "["+this.toArray().toString()+"]";
    }
}

export enum Bounds{
    Empty = 0,
    Full = -1,
}
