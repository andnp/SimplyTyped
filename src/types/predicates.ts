import { False, True, And, Or, Not } from './conditionals';
import { Keys } from './objects';
import { AnyFunc } from './functions';

/** no-doc */
export type KnownProblemPrototypeKeys = 'toString' | 'toLocaleString' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'constructor' | 'valueOf';
/** no-doc */
export type ArrayPrototypeKeys = Keys<any[]>;
/** no-doc */
export type NumberPrototypeKeys = Keys<number>;
/** no-doc */
export type BooleanPrototypeKeys = Keys<false>;
/** no-doc */
export type StringPrototypeKeys = Keys<string>;
/** no-doc */
export type ObjectPrototypeKeys = Keys<Object>; // tslint:disable-line
/** no-doc */
export type FunctionPrototypeKeys = Keys<Function>; // tslint:disable-line

export type IsNever<S extends string> = Not<(Record<S, True> & Record<string, False>)[S]>;
export type IsType<T, X> = X extends T ? True : False;
export type IsArray<T> = T extends any[] ? True : False;
export type IsNumber<T> = T extends number ? True : False;
export type IsString<T> = T extends string ? True : False;
export type IsFunction<T> =
    Or<
        T extends AnyFunc ? True : False,
        T extends Function ? True : False>; // tslint:disable-line

export type IsStringFunction<T extends string> = And<IsString<T>, IsNever<T>>;
export type IsBoolean<T> = T extends boolean ? True : False;
export type IsNull<T> = T extends null ? True : False;
export type IsUndefined<T> = T extends undefined ? True : False;
export type IsNil<T> = Or<IsNull<T>, IsUndefined<T>>;

export type IsObject<T> = And<
    T extends object ? True : False,
    And<Not<IsFunction<T>>,
    Not<IsArray<T>>>
>;

// hmm...
export type IsAny<T> =
    And<Not<IsArray<T>>,
    And<Not<IsBoolean<T>>,
    And<Not<IsNumber<T>>,
    And<Not<IsString<T>>,
    And<Not<IsFunction<T>>,
    And<Not<IsNil<T>>,
    Not<IsObject<T>>>>>>>
>;
