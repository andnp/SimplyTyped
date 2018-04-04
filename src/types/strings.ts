import { True, False, And } from './conditionals';
import { IsNever } from './predicates';

export type Diff<T extends string, U extends string> = Exclude<T, U>;
export type DropString<T extends string, U extends T> = Diff<T, U>;

export type StringEqual<T extends string, U extends string> =
    And<
        IsNever<Diff<T, U>>,
        IsNever<Diff<U, T>>
    >;

export type UnionContains<T extends string, U extends string> = (Record<T, True> & Record<string, False>)[U];
