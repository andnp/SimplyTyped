import { False, True } from './conditionals';
import { AnyFunc } from './functions';

// -------
// Helpers
// -------
/**
 * An object with string keys and values of type `any`.
 */
export type PlainObject = Record<string, any>;
/**
 * Takes any type and makes it an object type.
 * Useful when combined with `&` intersection types.
 * @param T A type who will be converted into an object
 * @returns An object formed by the key, value pairs of T
 */
export type ObjectType<T> = {
    [k in Keys<T>]: T[k];
};
/**
 * Takes two objects and returns their intersection.
 * This combines all keys and uses `ObjectType` to "clean up" the resultant object.
 * Useful for making extremely complex types look nice in VSCode.
 * @param T First object to be intersected
 * @param U Second object to be intersected
 * @returns `T` & `U` cleaned up to look like flat object to VSCode
 */
export type CombineObjects<T extends object, U extends object> = ObjectType<T & U>;
/**
 * Gets the value of specified property on any object without compile time error (`Property 'b' does not exist on type '{ a: string; }'.`) and the like.
 * Returns `never` if the key is not on the object.
 * It helps to use `If<HasKey...` to handle validity of the object first.
 * @param T Object to get values from
 * @param K Key to query object for value
 * @returns `T[K]` if the key exists, `never` otherwise
 */
export type GetKey<T, K extends ObjectKeys> = K extends Keys<T> ? T[K] : never;

// ----
// Keys
// ----
/**
 * Objects can be indexed by multiple types: `string`, `number`, `symbol`.
 * For safe compatibility with typescript version, this type will always
 * have the correct set of object key types for the current version of TS.
 *
 * This is useful for functions that must take a key, instead of `K extends string`,
 * use `K extends ObjectKeys`.
 */
export type ObjectKeys = keyof any;
/**
 * Typescript 2.9 introduced `number | symbol` as possible results from `keyof any`.
 * For backwards compatibility with objects containing only `string` keys, this will
 * exclude any `number | symbol` keys from `keyof`.
 * @param T type from which to get keys
 * @returns keys of `T` that extend `string`
 */
export type StringKeys<T> = Exclude<Keys<T>, number | symbol>;
/**
 * No different than `keyof`, but can look a bit nicer when nesting many types deep.
 * @param T type from which to get keys
 * @returns keys of `T` that extend `string | number | symbol`
 */
export type Keys<T> = keyof T;
/**
 * When an object has optional or readonly keys, that information is contained within the key.
 * When using optional/readonly keys in another object, they will retain optional/readonly status.
 * `PureKeys` will remove the optional/readonly status modifiers from keys.
 * @param T type from which to get keys
 * @returns keys of `T` without status modifiers (readonly/optional)
 */
export type PureKeys<T> = Record<Keys<T>, Keys<T>>[Keys<T>];
/**
 * Gets all of the keys that are shared between two objects.
 * @param T first type from which keys will be pulled
 * @param U second type from which keys will be pulled
 * @returns the keys that both `T` and `U` have in common.
 */
export type SharedKeys<T, U> = Keys<T> & Keys<U>;
/**
 * Gets all keys between two objects.
 * @param T first type from which keys will be pulled
 * @param U second type from which keys will be pulled
 * @returns the keys of `T` in addition to the keys of `U`
 */
export type AllKeys<T, U> = Keys<T> | Keys<U>;
/**
 * Gets all of the keys that are different between two objects.
 * This is a set difference between `Keys<T>` and `Keys<U>`.
 * Note that calling this with arguments reversed will have different results.
 * @param T first type from which keys will be pulled
 * @param U second type from which keys will be pulled
 * @returns keys of `T` minus the keys of `U`
 */
export type DiffKeys<T, U> = Exclude<Keys<T>, Keys<U>>;
/**
 * Returns `True` if a key, `K`, is present in a type, `T`, else `False`.
 * @param T type to check for existence of key `K`.
 * @param K key to query `T` for
 * @returns `True` if `K` is a key of `T`. Else `False`.
 */
export type HasKey<T, K extends ObjectKeys> = K extends Keys<T> ? True : False;

/**
 * @param T the union to get the keys of
 * @returns a union containing all the keys of members of `T`
 */
export type UnionKeys<T>
    // Using a conditional here, so that it distributes over members of the union
    // See https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-types
    = T extends unknown ? keyof T : never;

// -------------
// Manipulations
// -------------
/**
 * Get a union of the properties of an object.
 * @param T the object whose property values will be unionized
 * @returns a union of the right-side values of `T`
 */
export type UnionizeProperties<T extends object> = T[Keys<T>];
/**
 * Gives back an object with listed keys removed.
 * This is the opposite of `Pick`.
 * @param T the object whose properties will be removed
 * @param K the union of keys to remove from `T`
 * @returns `T` with the keys `K` removed
 */
export type Omit<T extends object, K extends Keys<T>> = Pick<T, Exclude<Keys<T>, K>>;
/**
 * Returns only the shared properties between two objects.
 * All shared properties must be the same type.
 * @param T the first object
 * @param U a second object whose shared properties (keys contained in both `T` and `U`) must have the same type as those in `T`
 * @returns the properties that are shared between `T` and `U`
 */
export type Intersect<T extends object, U extends Partial<T>> = Omit<U, DiffKeys<U, T>>;
/**
 * Can change the types of properties on an object.
 * This is similar to `Merge`, except that it will not add previously non-existent properties to the object.
 * @param T the object whose properties will be overwritten
 * @param U the object who will overwrite `T`
 * @returns `T` with properties overwritten with values in `U`
 */
export type Overwrite<T extends object, U extends object> = {
    [k in keyof T]: k extends keyof U ? U[k] : T[k];
};
/**
 * Much like `_.merge` in javascript, this returns an object with all keys present between both objects, but conflicts resolved by rightmost object.
 * @param T the object whose properties will be overwritten
 * @param U the object whose properties will be present _as is_ in the resultant object
 * @returns an object containing all of `U` and properties of `T` not present in `U`
 */
export type Merge<T extends object, U extends object> = Overwrite<T, U> & U;
/**
 * For discriminated unions of objects, it is important to have a single "tag" property.
 * Creates an object with each entry being tagged by the key defining that entry.
 * @param T a Record of objects
 * @param Key the key to add to each inner object as the tag property
 * @returns a record where each key of the record is now the `Key` property of the inner object
 */
export type TaggedObject<T extends Record<ObjectKeys, object>, Key extends ObjectKeys> = {
    [K in Keys<T>]: T[K] & Record<Key, K>;
};

// ---------
// Accessors
// ---------
/**
 * Uses `Partial` to make every parameter of an object optional (`| undefined`).
 * Iterates through arrays of objects and nested objects.
 * @param T the type to take a partial of. Can be deeply nested.
 * @returns `Partial<T>` recursively through all properties of `T`
 */
export type DeepPartial<T> = Partial<{
    [k in Keys<T>]:
        T[k] extends Array<unknown> ? Array<DeepPartial<T[k][number]>> :
        T[k] extends AnyFunc ? T[k] :
        T[k] extends object ? DeepPartial<T[k]> :
            T[k];
}>;
/**
 * Marks all keys as required.
 * @param T object whose keys will be marked required
 * @returns `T` with all fields marked required
 */
export type AllRequired<T extends object> = {
    [K in Keys<T>]-?: NonNullable<T[K]>
};
/**
 * Mark specific keys, `K`, of `T` as required.
 * @param T object whose keys will be marked required
 * @param K keys of `T` that will be marked required
 * @returns `T` with keys, `K`, marked as required
 */
export type Required<T extends object, K extends Keys<T>> = CombineObjects<
    {[k in K]-?: NonNullable<T[k]> },
    Omit<T, K>
>;
/**
 * Mark specific keys, `K`, of `T` as optional (think `Partial`).
 * @param T object whose keys will be marked optional
 * @param K keys of `T` that will be marked optional
 * @returns `T` with keys, `K`, marked as optional
 */
export type Optional<T extends object, K extends Keys<T>> = CombineObjects<
    {[k in K]?: T[k] | undefined },
    Omit<T, K>
>;
/**
 * Uses `Readonly` to make every parameter of an object - and its sub-objects recursively - readonly.
 * @param T type to be recursively traversed with keys marked as readonly
 * @returns `T` with all keys recursively marked as readonly
 */
export type DeepReadonly<T> = Readonly<{
    [k in Keys<T>]:
        T[k] extends Array<unknown> ? ReadonlyArray<DeepReadonly<T[k][number]>> :
        T[k] extends AnyFunc ? T[k] :
        T[k] extends object ? DeepReadonly<T[k]> :
            T[k];
}>;
/**
 * Gets all keys that point to a given type.
 * @param O the object whose keys will be returned
 * @param T the type to filter by
 * @returns keys of `O` whose right-side value is `T`
 */
export type KeysByType<O extends object, T> = {
    [k in keyof O]: O[k] extends T ? k : never;
}[keyof O];


// -------
// Classes
// -------
/**
 * Builds the type of any constructor function for a particular object.
 * @param T the object to build a constructor for
 * @returns a constructor for `T` with the prototype set to `T`
 */
export interface ConstructorFor<T extends object> {
    new (...args: any[]): T;
    prototype: T;
}

// ------
// Unions
// ------

/**
 * Makes a union 'strict', such that members are disallowed from including the keys of other members
 * For example, `{x: 1, y: 1}` is a valid member of `{x: number} | {y: number}`,
 *     but it's not a valid member of StrictUnion<{x: number} | {y: number}>.
 * @param T a union type
 * @returns a the strict version of `T`
 */
export type StrictUnion<T> = _StrictUnionHelper<T, T>;

// UnionMember is actually passed as the whole union, but it's used in a distributive conditional
//   to refer to each individual member of the union
/** no-doc */
export type _StrictUnionHelper<UnionMember, Union> =
    UnionMember extends unknown ?
        UnionMember & Partial<Record<Exclude<UnionKeys<Union>, keyof UnionMember>, never>>
    : never;
