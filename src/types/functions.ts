import { If } from './conditionals';
import { IsAny } from './predicates';

/**
 * This represents the constructor for a particular object.
 */
export type ConstructorFunction<T extends object> = new (...args: any[]) => T;
/**
 * This is a function that takes some args and returns a boolean
 */
export type Predicate<A = any> = If<IsAny<A>, (...args: any[]) => boolean, (arg: A) => boolean>;
/**
 * Concisely and cleanly define an arbitrary function.
 * Useful when designing many api's that don't care what function they take in, they just need to know what it returns.
 */
export type AnyFunc<R = any> = (...args: any[]) => R;

/**
 * Modifies the return value of a function of up to 7 parameters.
 * @param F a function with up to 7 parameters
 * @param R the new return value of the function
 * @returns the function `F` with new return value `R`
 */
export type OverwriteReturn<F extends AnyFunc, R> =
    F extends ((...x: infer T) => unknown) ? ((...x: T) => R) : never;

/**
 * Returns a tuple type of a functions arguments up to 7.
 * @param F a function with up to 7 arguments
 * @returns a tuple containing `F`'s argument types
 */
export type ArgsAsTuple<F extends AnyFunc> =
    F extends ((...x: infer T) => unknown) ? T : never;
