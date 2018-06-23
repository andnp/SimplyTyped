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
    F extends () => any ? () => R :
    F extends (x1: infer X1) => any ? (x1: X1) => R :
    F extends (x1: infer X1, x2: infer X2) => any ? (x1: X1, x2: X2) => R :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3) => any ? (x1: X1, x2: X2, x3: X3) => R :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4) => any ? (x1: X1, x2: X2, x3: X3, x4: X4) => R :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5) => any ? (x1: X1, x2: X2, x3: X3, x4: X4, x5: X5) => R :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5, x6: infer X6) => any ? (x1: X1, x2: X2, x3: X3, x4: X4, x5: X5, x6: X6) => R :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5, x6: infer X6, x7: infer X7) => any ? (x1: X1, x2: X2, x3: X3, x4: X4, x5: X5, x6: X6, x7: X7) => R :
        AnyFunc<R>;

/**
 * Returns a tuple type of a functions arguments up to 7.
 * @param F a function with up to 7 arguments
 * @returns a tuple containing `F`'s argument types
 */
export type ArgsAsTuple<F extends AnyFunc> =
    F extends () => any ? void[] :
    F extends (x1: infer X1) => any ? [X1] :
    F extends (x1: infer X1, x2: infer X2) => any ? [X1, X2] :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3) => any ? [X1, X2, X3] :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4) => any ? [X1, X2, X3, X4] :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5) => any ? [X1, X2, X3, X4, X5] :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5, x6: infer X6) => any ? [X1, X2, X3, X4, X5, X6] :
    F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5, x6: infer X6, x7: infer X7) => any ? [X1, X2, X3, X4, X5, X6, X7] :
        any[];
