import * as Utils from "../Utils";
import * as Compare from "./interfaces/Comparable";
import * as bnds from "../Enums/Bounds";
export default class Queue<T>{
    private readonly DEFAULT_SIZE:number = Infinity;
    private _innerArray: T[] = new Array();
    private _maxSize: number;
    public get maxSize(){
        return this._maxSize;
    }
    /**
     * The number of items in the queue.
     */
    public get count():number{
        return this._innerArray.length;
    }

    /**
     * Creates a new queue object.
     * @param {number=} maxSize - The maximum number of elements the queue can contain.
     */
    public constructor(maxSize?:number){
        if(Utils.isUndefined(maxSize)){
            this._maxSize = this.DEFAULT_SIZE;
        }else{
            this._maxSize = maxSize;
        }
    }

    /**
     * Adds a new item to the top of the queue. Alias for enqueue().
     * @return {number} The new size of the queue, or the enum member Bounds.Empty (i.e -1).
     */
    public add(item: T):number{
        return this.enqueue(item);
    }

    /**
     * Adds a new item to the top of the queue.
     * @return {number} The new size of the queue, or the enum member Bounds.Empty (i.e -1).
     */
    public enqueue(item: T): number{
        if(this._innerArray.length < this._maxSize){
            return this._innerArray.push(item);
        }
        return bnds.Bounds.Full;
    }
    
    /**
     * Removes the first element in the queue and returns it.
     * @return {T} The element removed from the queue.
     */
    public dequeue(): T{
        return this._innerArray.shift();
    }

    /**
     * Returns the last element of the queue without removing it.
     * @return {T} The last element in the queue.
     */
    public front():T{
        return this._innerArray[0];
    }

    /**
     * Returns whether or not the queue has any contents.
     * @return {boolean}
     */
    public isEmpty():boolean{
        return Utils.areEqual(this.count, bnds.Bounds.Empty);
    }

    /**
     * Returns whether or not the queue can add any more elements.
     * @return {boolean}
     */
    public isFull(): boolean{
        return Utils.areEqual(this.count, this._maxSize);
    }
    
    public toArray(): T[]{
        return this._innerArray.slice(0);
    }

    public toString(): string {
        return "["+this.toArray().toString()+"]";
    }
}