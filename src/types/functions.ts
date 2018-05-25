import { If } from './conditionals';
import { IsAny } from './predicates';

export type ConstructorFunction<T extends object> = new (...args: any[]) => T;
export type Predicate<A = any> = If<IsAny<A>, (...args: any[]) => boolean, (arg: A) => boolean>;
export type AnyFunc<R = any> = (...args: any[]) => R;
