export interface Vector<T> { readonly [x: number]: T; readonly length: number; }
export type Length<T extends Vector<any>> = T['length'];

export type UnionizeTuple<T extends Vector<any>> = T[number];
