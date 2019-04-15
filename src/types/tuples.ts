import {UnionToIntersection} from './utils';

export interface Vector<T> { readonly [x: number]: T; readonly length: number; }
export type Length<T extends Vector<any>> = T['length'];

/**
 * Gives a union of all values contained in a tuple.
 * @param T a tuple of items
 * @returns a union of all items in tuple
 */
export type UnionizeTuple<T extends Vector<any>> = T[number];
/**
 * Gives an intersection of all values contained in a tuple.
 * @param T a tuple of items up to 10
 * @returns an intersection of all items in the tuple
 */
export type IntersectTuple<T extends Vector<any>>= UnionToIntersection<T[number]>;
