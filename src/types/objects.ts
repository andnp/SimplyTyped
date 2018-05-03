import { Diff } from './strings';
import { IsObject } from './predicates';
import { If, False, True } from './conditionals';
import { Nullable } from './utils';

// -------
// Helpers
// -------
export type PlainObject = Record<string, any>;
export type ObjectType<T> = {
    [k in Keys<T>]: T[k];
};
export type CombineObjects<T extends object, U extends object> = ObjectType<T & U>;
export type GetKey<T, K extends string> = K extends Keys<T> ? T[K] : never;

// ----
// Keys
// ----
export type StringKeys<T> = Exclude<Keys<T>, number | symbol>;
export type Keys<T> = keyof T;
export type PureKeys<T> = Record<Keys<T>, Keys<T>>[Keys<T>];
export type SharedKeys<T, U> = Keys<T> & Keys<U>;
export type AllKeys<T, U> = Keys<T> | Keys<U>;
export type DiffKeys<T, U> = Diff<Keys<T>, Keys<U>>;
export type HasKey<T, U extends string | number | symbol> = U extends Keys<T> ? True : False;

// -------------
// Manipulations
// -------------
export type UnionizeProperties<T extends object> = T[Keys<T>];
export type Omit<T extends object, K extends Keys<T>> = Pick<T, Diff<Keys<T>, K>>;
export type Intersect<T extends object, U extends Partial<T>> = Omit<U, DiffKeys<U, T>>;
export type Merge<T extends object, U extends object> = CombineObjects<Omit<T, SharedKeys<T, U>>, U>;
export type Overwrite<T extends object, U extends object> = Merge<T, Intersect<T, U>>;
export type TaggedObject<T extends Record<string, object>, Key extends string> = {
    [K in Keys<T>]: T[K] & Record<Key, K>;
};

// ---------
// Accessors
// ---------
export type DeepPartial<T extends PlainObject> = Partial<{
    [k in Keys<T>]:
        If<IsObject<T[k]>,
            DeepPartial<T[k]>,
            T[k]
        >
}>;
export type AllRequired<T extends object> = {
    [K in Keys<T>]-?: NonNullable<T[K]>
};
export type Required<T extends object, K extends Keys<T>> = CombineObjects<
    {[k in K]-?: NonNullable<T[k]> },
    Omit<T, K>
>;
export type Optional<T extends object, K extends Keys<T>> = CombineObjects<
    {[k in K]?: Nullable<T[k]> },
    Omit<T, K>
>;
export type DeepReadonly<T extends PlainObject> = Readonly<{
    [k in Keys<T>]:
        If<IsObject<T[k]>,
            DeepReadonly<T[k]>,
            T[k]
        >
}>;

// -------
// Classes
// -------
export interface ConstructorFor<T extends object> {
    new (...args: any[]): T;
    prototype: T;
}
