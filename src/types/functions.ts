import { If } from './conditionals';
import { IsAny } from './predicates';
import { DeepReadonly, Keys } from './objects';

export type ConstructorFunction<T extends object> = new (...args: any[]) => T;
export type Predicate<A = any> = If<IsAny<A>, (...args: any[]) => boolean, (arg: A) => boolean>;

export function Readonly<T extends object>(obj: T): DeepReadonly<T> { return obj; }

export function isKeyOf<T extends object>(obj: T, k: string): k is keyof T {
    return Object.keys(obj).includes(k);
}

export function objectKeys<T extends object>(obj: T) {
    return Object.keys(obj) as Array<Keys<T>>;
}
