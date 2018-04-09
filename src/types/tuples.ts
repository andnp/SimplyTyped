export interface Vector<T> { readonly [x: number]: T; readonly length: number; }
export type Length<T extends Vector<any>> = T['length'];

export type UnionizeTuple<T extends Vector<any>> = T[number];
export type IntersectTuple<T extends Vector<any>> =
    Length<T> extends 1 ? T[0] :
    Length<T> extends 2 ? T[0] & T[1] :
    Length<T> extends 3 ? T[0] & T[1] & T[2] :
    Length<T> extends 4 ? T[0] & T[1] & T[2] & T[3] :
    Length<T> extends 5 ? T[0] & T[1] & T[2] & T[3] & T[4] :
    Length<T> extends 6 ? T[0] & T[1] & T[2] & T[3] & T[4] & T[5] :
    Length<T> extends 7 ? T[0] & T[1] & T[2] & T[3] & T[4] & T[5] & T[6] :
    Length<T> extends 8 ? T[0] & T[1] & T[2] & T[3] & T[4] & T[5] & T[6] & T[7] :
    Length<T> extends 9 ? T[0] & T[1] & T[2] & T[3] & T[4] & T[5] & T[6] & T[7] & T[8] :
    Length<T> extends 10 ? T[0] & T[1] & T[2] & T[3] & T[4] & T[5] & T[6] & T[7] & T[8] & T[9] :
        any;
