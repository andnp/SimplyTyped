import { False, ReallyTrue, And, Xor, Not } from './conditionals';
import { Diff, UnionContains } from './strings';
import { Keys, HasKey } from './objects';

export type KnownProblemPrototypeKeys = 'toString' | 'toLocaleString' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'constructor' | 'valueOf';
export type ArrayPrototypeKeys = Keys<any[]>;
export type NumberPrototypeKeys = Keys<number>;
export type BooleanPrototypeKeys = Keys<false>;
export type StringPrototypeKeys = Keys<string>;
export type ObjectPrototypeKeys = Keys<Object>; // tslint:disable-line
export type FunctionPrototypeKeys = Keys<Function>; // tslint:disable-line

export type IsNever<S extends string> = UnionContains<UnionContains<S, S>, False>;
export type IsType<T, X> = ReallyTrue<HasKey<T, Keys<X>>>;
export type IsAny<T> = IsNever<HasKey<T, string>>;
export type IsArray<T> = ReallyTrue<HasKey<T, ArrayPrototypeKeys>>;
export type IsNumber<T> = ReallyTrue<HasKey<T, NumberPrototypeKeys>>;
export type IsString<T> = ReallyTrue<HasKey<T, StringPrototypeKeys>>;
export type IsFunction<T> =
    Xor<
        IsNever<Keys<T>>,
        ReallyTrue<HasKey<T, FunctionPrototypeKeys>>>;

// TODO: this doesn't quite cut it
export type IsStringFunction<T extends string> = And<IsString<T>, IsNever<T>>;
export type IsBoolean<T> =
    And<And<And<
        Not<IsStringFunction<Diff<Keys<T>, BooleanPrototypeKeys>>>, // filter out annoying prototype keys ie: 'toString' & () => boolean
        Not<IsNever<Keys<T>>>>, // Make sure isn't a function because function types have no prototype keys, making first check fail
        Not<HasKey<T, string>>>, // Make sure isn't any, by checking that all strings are in the prototype
        IsNever<Diff<Keys<T>, BooleanPrototypeKeys>>>;

export type IsObject<T> =
    And<And<And<And<
        Not<IsArray<T>>,
        Not<IsNumber<T>>>,
        Not<IsString<T>>>,
        Not<IsBoolean<T>>>,
        Not<IsFunction<T>>>;

