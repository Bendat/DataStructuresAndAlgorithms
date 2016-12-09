import LinkedList from "../src/datastructures/LinkedList"
/**
 * Adds the numbers min through max inclusive to a datastructure.
 * @param {Object} list - A collection datastructure containing an add() method.
 * @param {number} min - the starting point of the range being added.
 * @param {number} max - the largest number being added to the list.
 */
export function addRange(list, min:number, max: number):void{
    for(let i = min; i <= max; i++){
        list.add(i);
    }
}