import { True, False, And } from './conditionals';
import { IsNever } from './predicates';

// TODO: this is here only for backwards compatibility
export type Diff<T, U> = Exclude<T, U>;

export type DropString<T extends string, U extends T> = Diff<T, U>;

export type StringEqual<T extends string, U extends string> =
    And<
        IsNever<Diff<T, U>>,
        IsNever<Diff<U, T>>
    >;

export type UnionContains<T, U> = U extends T ? True : False;
