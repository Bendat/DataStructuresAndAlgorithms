import * as Utils from "../Utils";
import * as Compare from "./interfaces/Comparable";
import {INode} from "./interfaces/Node";
export default class LinkedList<T>{

    /**@private */
    private _firstNode: INode<T> = null;
    /**
     * Retrieves the first element stored in the Linked List.
     * @return {Object}
     */
    public get firstElement(): T{
        return Utils.isNull(this._firstNode) ? undefined: this._firstNode.element;
    }

    /**@private */
    private  _lastNode: INode<T> = null;
    /**
     * Retrieves the last element stored in the LinkedList.
     * @return {Object}
     */
    public get lastElement(): T{
        return Utils.isNull(this._lastNode) ? undefined: this._lastNode.element;
    }
    
    /**@private */
    private _count: number = 0;
    /**
     * Gets the number of elements in this Linked List.
     * @return {number} - the Number of elements. 
     */
    public get count(): number{
        return this._count;
    }

    /**
     * @return {Object} - An object containing the start and end indexes as {start: 0, end: x}.
     */
    public indexRange = () => {return {start: 0, end: this._count -1}}
    
    /**
     * Creates an empty LinkedList object.
     */
    public constructor(){};

    /**
     * Appends a new item to the end of the Linked List.
     * @return {boolean} - returns true if item is succesfully added, otherwise returns false.
     */
    public add(item: T): boolean{
        var index = this._count;
        return this.addAt(item, index);
    }

    /**
     * Adds a new items to the linked list at the specified location.
     * @param {T} item
     * @param {numer} index
     * @return {boolean} - true for a succesfully added element, otherwise false.
     */
    public addAt(item: T, index: number): boolean{
        if(!this.isValidIndex || Utils.isUndefined(item)){
            return false;
        }

        var newNode = this.createNode(item);
        if(Utils.areEqual(this._count, 0)){
            this._firstNode = newNode;
            this._lastNode = newNode;
        }else if(Utils.areEqual(index, 0)){
            newNode.next = this._firstNode;
            this._firstNode = newNode;
        }else if(Utils.areEqual(index, this._count)){
            this._lastNode.next = newNode;
            this._lastNode = newNode;
        }else{
            var previous = this.nodeAt(index-1);
            newNode.next = previous.next;
            previous.next = newNode;
        }
        this._count++;
        return true;
    }
    
    /**
     * Removes the item provided from the Linked List if it exists.
     * @param {T} item - the item to be removed;
     * @param {Function} comparer. Custom function for equality checks where === is insufficient.
     * @return {boolean} returns true if succesfull otherwise false;
     */
    public remove(item: T, comparer?: Function): boolean{
        var equalityCheck = this.defaultOrCustomEqualityCheck(comparer);
        if(!this.isValidIndex){return false;}

        var previousNode: INode<T> = null;
        var currentNode = this._firstNode;

        while(!Utils.isNull(currentNode)){
            if(equalityCheck(currentNode.element, item)){
                this.removeNode(currentNode, previousNode);
                this._count--;
                return true;
            }
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        return false;       
    }

    /**
     * Removes the item that exists at a given index.
     * @param {number} index
     * @return {T|undefined} the removed element, or undefined if it does not exist.
     */
    public removeAt(index: number): T{
        if(!this.isValidIndex(index)){return undefined}
        var element: T;
        if(Utils.areEqual(this._count, 1)){
            element = this._firstNode.element;
            this._firstNode = null;
            this._lastNode = null;
        }else{
            var previousNode = this.nodeAt(index - 1);
            if(Utils.isNull(previousNode)){
                element = this._firstNode.element;
                this._firstNode = this._firstNode.next;
            }else if(Utils.areEqual(previousNode.next, this._lastNode)){
                element = this._lastNode.element;
                this._lastNode = previousNode;
            }
            if(!Utils.isNull(previousNode)){
                element = previousNode.next.element;
                previousNode.next = previousNode.next.next
            }
        }
        this._count--;
        return element;
    }

    public clearAll(): void{
        this._firstNode = null;
        this._lastNode = null;
        this._count = 0;
    }
    /**
     * Returns the element at the specified index, if it exists.
     * @param {number} index
     * @return {T}
     */
    public elementAt(index: number): T{
        var node = this.nodeAt(index)
        return Utils.isNull(node) ? undefined : node.element;
    }

    /**
     * Returns the index of the first occurrence of an item in the Linked List.
     * @param {Object} item - the element to search for.
     * @param {Function(object, object)=} comparer - A function implementing the IEquals interface 
     * that can compare the elements in the list if a standard equality check is inadequate.
     * @return {Number} the index of the item in the list, or -1 if it does not exist.
     */
    public indexOf(item: T, comparer?: Function){
        if(Utils.isUndefined(item)) {return -1;}
        var equalityCheck = this.defaultOrCustomEqualityCheck(comparer);

        var currNode = this._firstNode;
        var index = 0;
        while(currNode !== null){
            if(equalityCheck(currNode.element, item)){
                return index;
            }
            currNode = currNode.next;
            index++;
        }
        return -1;
    }

    /**
     * Determines if the Linked List contains a given element.
     * @param {T} item - the item to search for.
     * @param {Function(a,b)=} comparer - A function implementing the IEquals interface 
     * that can compare the elements in the list if a standard equality check is inadequate.
     * @return {boolean}
     */
    public contains(item: T, comparer?: Function): boolean{
        var equalityCheck = this.defaultOrCustomEqualityCheck(comparer);
        return !Utils.areEqual(this.indexOf(item, comparer), -1);
    }

    public forEach(callBack: Function){
        var currentNode = this._firstNode;
        while(!Utils.isNull(currentNode)){
            callBack(currentNode.element);
            currentNode = currentNode.next;
        }
    }

    /**
     * Checks if the Linked List contains any elements or not.
     * @return {boolean} - true if list is empty, otherwise false.
     */
    public isEmpty(): boolean{
        return Utils.areEqual(this._count, 0);
    }

    public toArray(): T[]{
        var array: T[] = [];
        var currentNode = this._firstNode;
        while(!Utils.isNull(currentNode)){
            array.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return array;
    }

    public toString(): string {
        return "["+this.toArray().toString()+"]";
    }

    /**@private */
    private removeNode(currentNode: INode<T>, previousNode: INode<T>):void{
        if(Utils.areEqual(currentNode, this._firstNode)){
            this._firstNode = this._firstNode.next;
            if(Utils.areEqual(currentNode, this._lastNode)){
                this._lastNode = null;
            }
        }else if(Utils.areEqual(currentNode, this._lastNode)){
            this._lastNode = previousNode;
            previousNode.next = currentNode.next;
            currentNode = null;
        }else{
            previousNode.next = currentNode.next;
            currentNode.next = null;
        }
    }

    /**@private */
    private defaultOrCustomEqualityCheck(comparer?: Function): Function{
        return !Utils.isUndefined(comparer) ? 
               comparer :(a:T, b:T):boolean => {return a === b;}
    }

    /**@private */
    private createNode(item: T): INode<T>{
        return {
            element: item,
            next: null,
        };
    }
    
    /**@private */
    private nodeAt(index: number): INode<T>{
        if(!this.isValidIndex(index)){
            return null;
        }

        switch(index){
            case 0: return this._firstNode;
            case this._count: return this._lastNode;
        }

        var node = this._firstNode;
        var pos = 0;
        for(let i = 0; i < index; i++){
            node = node.next
        }
        return node;
    } 

    /**@private */
    private isValidIndex(index: number): boolean{
        return index >= 0 && index < this._count;
    }


}


