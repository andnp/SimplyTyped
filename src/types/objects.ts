import { Diff, UnionContains } from './strings';

export type UnionizeProperties<T extends object> = T[Keys<T>];
export type Omit<T extends object, K extends Keys<T>> = Pick<T, Diff<Keys<T>, K>>;

export type DeepPartial<T extends object> = Partial<{
    [k in Keys<T>]: DeepPartial<T[k]>
}>;

export type ObjectType<T extends object> = {
    [k in Keys<T>]: T[k];
};

export type CombineObjects<T extends object, U extends object> = ObjectType<T & U>;

export type Keys<T> = keyof T;
export type SharedKeys<T, U> = Keys<T> & Keys<U>;
export type AllKeys<T, U> = Keys<T> | Keys<U>;
export type DiffKeys<T, U> = Diff<Keys<T>, Keys<U>>;
export type HasKey<T, U extends string> = UnionContains<Keys<T>, U>;

export type Intersect<T extends object, U extends Partial<T>> = Omit<U, DiffKeys<U, T>>;

export type Merge<T extends object, U extends object> = CombineObjects<Omit<T, SharedKeys<T, U>>, U>;
export type Overwrite<T extends object, U extends object> = Merge<T, Intersect<T, U>>;
export type GetKey<T, K extends string> = (Record<string, never> & T)[K];
