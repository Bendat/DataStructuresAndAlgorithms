export function isUndefined(item: any): boolean{
    return (typeof item) === 'undefined';
}
export function isNull(item: any){
    return item === null;
}

export function isDefinedNotNull(item: any){
    return !isUndefined(item) && !isNull(item);
}
// equal equals? equal equal equals!
export function areEqual(a: any, b: any): boolean{
    return a === b;
}
