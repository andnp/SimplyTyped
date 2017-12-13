export type ConstructorFunction<T extends object> = new (...args: any[]) => T;
export type Predicate = (...args: any[]) => boolean;
