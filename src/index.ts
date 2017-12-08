// Conditionals
export type True = '1';
export type False = '0';
export type Bool = False | True;
export type If<Cond extends Bool, Then, Else> = [Else, Then][Cond];
export type Not<A extends Bool> = If<A, False, True>;
export type And<A extends Bool, B extends Bool> = If<A, If<B, True, False>, False>;
export type Or<A extends Bool, B extends Bool> = If<A, If<B, True, True>, If<B, True, False>>;

// Strings

/**
 * From https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
 * Omits keys in K from object type T
 */
export type Diff<T extends string, U extends string> = ({[K in T]: K} & Record<U, never> & Record<string, never>)[T];
export type DropString<T extends string, U extends T> = Diff<T, U>;
export type StringEqual<T extends string, U extends string> = UnionHasString<T, U>;

// Tuples

export interface Vector<T> { readonly [x: number]: T; }

export type UnionizeTuple<T extends Vector<any>> = T[number];

// Objects

export type UnionizeProperties<T extends object> = T[Keys<T>];

export type DeepPartial<T extends object> = Partial<{
    [k in keyof T]: DeepPartial<T[k]>
}>;

export type ObjectType<T extends object> = {
    [k in Keys<T>]: T[k];
}

export type CombineObjects<T extends object, U extends object> = ObjectType<T & U>;

export type Keys<T extends object> = keyof T;
export type SharedKeys<T extends object, U extends object> = Keys<T> & Keys<U>;
export type AllKeys<T extends object, U extends object> = Keys<T> | Keys<U>;
export type DiffKeys<T extends object, U extends object> = Diff<Keys<T>, Keys<U>>;

export type Merge<T extends object, U extends object> = CombineObjects<Omit<T, SharedKeys<T, U>>, U>;

