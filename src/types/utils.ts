import { ObjectType } from "./objects";
/**
 * Prevent `T` from being inferred in generic function
 *
 * @param T the type that will be un-inferrable
 * @returns type of `T`
 * @see https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-322267089
 */
export type NoInfer<T> = T & ObjectType<T>;

/**
 * Prevent `T` from being distributed in a conditional type.
 * A conditional is only distributed when the checked type is naked type param and T & {} is not a
 * naked type param, but has the same contract as T.
 *
 * @note This must be used directly the condition itself: `NoDistribute<T> extends U`,
 * it won't work wrapping a type argument passed to a conditional type.
 *
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-types
 */
export type NoDistribute<T> = T & {};

/**
 * Mark a type as nullable (`null | undefined`).
 * @param T type that will become nullable
 * @returns `T | null | undefined`
 */
export type Nullable<T> = T | null | undefined;

/**
 * no-doc - This is a helper for `Nominal` and is not useful on its own
 */
export declare class Tagged<N extends string> { protected _nominal_: N; }
/**
 * Constructs a nominal type of type `T`.
 * Useful to prevent any value of type `T` from being used or modified in places it shouldn't (think `id`s).
 * @param T the type of the `Nominal` type (string, number, etc.)
 * @param N the name of the `Nominal` type (id, username, etc.)
 * @returns a type that is equal only to itself, but can be used like its contained type `T`
 */
export type Nominal<T, N extends string> = T & Tagged<N>;

/**
 * Returns the given type or a Promise containing that type.
 * @param T the inner type for the promise
 * @returns a the type union with a promise containing the given type
 */
export type PromiseOr<T> = Promise<T> | T;


/**
 * Defines an intersection type of all union items.
 * @param U Union of any types that will be intersected.
 * @returns U items intersected
 * @see https://stackoverflow.com/a/50375286/9259330
 */
export type UnionToIntersection<U> =
    (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
