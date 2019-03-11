import { True, False, And } from './conditionals';
import { IsNever } from './predicates';

export type DropString<T extends string, U extends T> = Exclude<T, U>;

export type StringEqual<T extends string, U extends string> =
    And<
        IsNever<Exclude<T, U>>,
        IsNever<Exclude<U, T>>
    >;

export type UnionContains<T, U> = U extends T ? True : False;
