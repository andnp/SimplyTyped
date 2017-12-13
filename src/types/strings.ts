import { True, False, And } from './conditionals';
import { IsNever } from './predicates';

/**
 * From https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
 */
export type Diff<T extends string, U extends string> = ({[K in T]: K} & Record<U, never> & Record<string, never>)[T];
export type DropString<T extends string, U extends T> = Diff<T, U>;

export type StringEqual<T extends string, U extends string> =
    And<
        IsNever<Diff<T, U>>,
        IsNever<Diff<U, T>>
    >;

export type UnionContains<T extends string, U extends string> = (Record<T, True> & Record<string, False>)[U];
