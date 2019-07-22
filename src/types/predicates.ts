import { False, True, And, Or, Not } from './conditionals';

/** no-doc */
export type KnownProblemPrototypeKeys = 'toString' | 'toLocaleString' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'constructor' | 'valueOf';
/** no-doc */
export type ArrayPrototypeKeys = keyof unknown[];
/** no-doc */
export type NumberPrototypeKeys = keyof number;
/** no-doc */
export type BooleanPrototypeKeys = keyof false;
/** no-doc */
export type StringPrototypeKeys = keyof string;
/** no-doc */
export type ObjectPrototypeKeys = keyof Object;
/** no-doc */
export type FunctionPrototypeKeys = keyof Function;

export type IsNever<T> = keyof any extends keyof T ? Not<IsAny<T>> : False;
export type IsType<T, X> = X extends T ? True : False;
export type IsArray<T> = T extends unknown[] ? True : False;
export type IsNumber<T> = T extends number ? True : False;
export type IsString<T> = T extends string ? True : False;
export type IsFunction<T> =
    Or<
        T extends Function ? True : False,
        T extends Function ? True : False>;

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

export type IsAny<T> = 0 extends (1 & T) ? True : False;
