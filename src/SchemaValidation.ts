import { ObjectType, Keys, If, UnionContains, StringEqual, GetKey } from './types';

export function isObject(x: any): x is ObjectType<any> {
    return typeof x === 'object';
}

export function isArray(x: any): x is Array<any> {
    return Array.isArray(x);
}

function allTrue(x: Array<boolean>) {
    let ret = true;
    x.forEach((y) => ret = ret && y);
    return ret;
}

function checkSchema(data: any, schema: any): boolean {
    if (!isObject(schema)) return false;
    if (schema.type === 'object') {
        if (!isObject(data)) return false;
        const props = schema.properties;
        const keys = Object.keys(props);
        const results = keys.map((k) => checkSchema(data[k], props[k]));
        return allTrue(results);
    } else if (schema.type === 'string') {
        return typeof data === 'string';
    } else if (schema.type === 'number') {
        return typeof data === 'number';
    } else if (schema.type === 'boolean') {
        return typeof data === 'boolean';
    } else if (schema.type === 'array') {
        if (!isArray(data)) return false;
        const results = data.map((x) => checkSchema(x, schema.items));
        return allTrue(results);
    }
    return true;
}

export type SchemaTypeString<T extends string, S extends object> =
    If<StringEqual<T, 'string'>,  string,
    If<StringEqual<T, 'number'>,  number,
    If<StringEqual<T, 'object'>,  Schematize<S>,
    If<StringEqual<T, 'array'>,   Array<Schematize<GetKey<S, 'items'>>>,
    If<StringEqual<T, 'boolean'>, boolean,
    any>>>>>

export type GetSchemaProperties<T extends object> = {
    [K in Keys<T>]: SchemaTypeString<GetKey<T[K], 'type'>, T[K]>
}

export type Schematize<T extends object> =
    If<UnionContains<Keys<T>, 'properties'>,
        GetSchemaProperties<GetKey<T, 'properties'>>,
        any>

export function schemaIsValid<T extends object>(data: any, schema: T): data is Schematize<T> {
    return checkSchema(data, schema);
}
