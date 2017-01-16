import * as Utils from "../Utils";
export class QuickSort<T>{
    private _innerArray: T[];
    private _comparator: Function;

    /**
     * Creates a new QuickSort object.
     * @param {T} array - The arrayto be sorted.
     * @param {Function} comparator - The function to compare elements with.
     */
    public constructor(array: T[], comparator?: Function){
        this._innerArray = array;
        this._comparator = this.defaultOrCustomComparator(comparator);
    }
    
    /**
     * Sorts the array;
     * @param {number=} left The index of the leftmost element, defaults 0
     * @param {number=} right The index of the rightmost element, defaults array.length-1
     */
    public sort(left?: number, right?: number): T[] {

        let pivot = null;
        let newPivot = null;
        if(!Utils.isDefinedNotNull(left)){
            left = 0
        }
        if(!Utils.isDefinedNotNull(right)){
            right = this._innerArray.length - 1;
        }
        if(left < right) {
            pivot = left + Math.ceil((right - left) * 0.5);
            newPivot  = this.partition(pivot, left, right);
            this.sort(left, newPivot - 1);
            this.sort(newPivot + 1, right);
        }
        return this._innerArray;
    }
    /**
     * Swaps two values positions in the array.
     * @param {number} first - Index of the first item to be swapped
     * @param {number} second - Index of the second item to be swapped
     */
    private swap(first: number, second: number): void {
        let temp = this._innerArray[first];
        this._innerArray[first] = this._innerArray[second];
        this._innerArray[second] = temp;
    }

    /**
     * Partitions the array such that its elements are grouped by their size relative to the pivot.
     * @param {number} pivot The index of the pivot
     * @param {number} left The index of the leftmost element
     * @param {number} right The index of the rightmost element
     * @returns {number}
     */
    private partition(pivot, left, right): number {

        let storeIndex = left;
        let pivotValue = this._innerArray[pivot];

        this.swap(pivot, right);

        for(let i = left; i < right; i++) {
            if(this._comparator(this._innerArray[i], pivotValue) == -1) {
                this.swap(i, storeIndex);
                storeIndex++;
            }
        }

        this.swap(right, storeIndex);

        return storeIndex;
    }

    /**@private*/
    private defaultOrCustomComparator(comparator){
        return Utils.isDefinedNotNull(comparator) ?
            comparator:
            (a: any, b: any) => {return a == b ? 0: a < b? -1 : 1;}
    }

}