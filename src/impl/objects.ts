import { DeepReadonly, Keys, TaggedObject } from '../types/objects';

/**
 * Type guard for any key, `k`.
 * Marks `k` as a key of `T` if `k` is in `obj`.
 * @param obj object to query for key `k`
 * @param k key to check existence in `obj`
 */
export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
    return k in obj;
}

/**
 * Same as `Object.keys` except that the returned type is an array of keys of the object.
 * Note that for the same reason that `Object.keys` does not do this natively, this method _is not safe_ for objects on the perimeter of your code (user input, read in files, network requests etc.).
 * @param obj object whose keys will be returned
 * @returns an array of keys from `obj`
 */
export function objectKeys<T extends object>(obj: T) {
    return Object.keys(obj) as Array<Keys<T>>;
}

/**
 * Useful for marking object literals as readonly while still keeping type inference:
 * `const obj = Readonly({ a: 22, b: 'yellow' });`
 * @param obj an object to be marked readonly
 * @returns `obj` marked as readonly at compile time
 */
export function Readonly<T extends object>(obj: T): DeepReadonly<T> { return obj as any; }

/**
 * Useful for tagged unions of objects (imagine redux reducers) this tags every sub-object with the key pointing to that sub-object.
 * @param obj an object of objects whose keys will be used as tags for the inner objects
 * @param key the name of the "tag" parameter
 * @returns `obj` with the inner objects tagged with parameter `key` and the key pointing to that inner object
 */
export function taggedObject<T extends Record<string, object>, K extends string>(obj: T, key: K): TaggedObject<T, K> {
    const keys = objectKeys(obj);
    return keys.reduce((collection: any, k) => {
        const inner: any = obj[k];
        collection[k] = {
            [key]: k,
            ...inner,
        };
        return collection;
    }, {} as TaggedObject<T, K>);
}
