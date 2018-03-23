import { DeepReadonly, Keys, TaggedObject } from '../types/objects';

export function isKeyOf<T extends object>(obj: T, k: string): k is keyof T {
    return Object.keys(obj).includes(k);
}

export function objectKeys<T extends object>(obj: T) {
    return Object.keys(obj) as Array<Keys<T>>;
}

export function Readonly<T extends object>(obj: T): DeepReadonly<T> { return obj as any; }

export const taggedObject = <T extends Record<string, object>, K extends string>(obj: T, key: K): TaggedObject<T, K> => {
    const keys = objectKeys(obj);
    return keys.reduce((collection: any, k) => {
        const inner: any = obj[k];
        collection[k] = {
            [key]: k,
            ...inner,
        };
        return collection;
    }, {} as TaggedObject<T, K>);
};
