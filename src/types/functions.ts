import { If } from './conditionals';
import { IsAny } from './predicates';

export type ConstructorFunction<T extends object> = new (...args: any[]) => T;
export type Predicate<A = any> = If<IsAny<A>, (...args: any[]) => boolean, (arg: A) => boolean>;
export type AnyFunc<R = any> = (...args: any[]) => R;

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
