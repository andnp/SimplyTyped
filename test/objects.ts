import test from 'ava';
import { AllKeys, CombineObjects, DeepPartial, DeepReadonly, DiffKeys, Intersect, Keys, Merge, ObjectType, Omit, Optional, Overwrite, SharedKeys, UnionizeProperties } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass(); }

// Objects

test('Can get keys from object', t => {
    type obj = { x: number, y: string, z: boolean };
    type expected = 'x' | 'y' | 'z';
    type got = Keys<obj>;

    assert<expected, got>(t);
});

test('Can turn an object into another object', t => {
    type obj = { x: number, y: string };
    type expected = obj;
    type got = ObjectType<obj>;

    assert<got, expected>(t);
});

test('Can combine two objects (without pesky & in vscode)', t => {
    type a = { x: number, y: 'hi' };
    type b = { z: number, y: 'there' };

    type got = CombineObjects<a, b>;
    type expected = {
        x: number,
        y: 'hi' & 'there',
        z: number
    };

    assert<got, expected>(t);
});

test('Can get keys that are same between objects', t => {
    type a = { x: number, y: string };
    type b = { x: string, y: string, z: boolean };

    type got = SharedKeys<a, b>;
    type expected = 'x' | 'y';

    assert<got, expected>(t);
});

test('Can get a union of all values in an object', t => {
    type a = { x: 'hi', y: 'there', z: 'friend' };

    type got = UnionizeProperties<a>;
    type expected = 'hi' | 'there' | 'friend';

    assert<got, expected>(t);
});

test('Can get all keys that are different between objects', t => {
    type a = { x: number, y: string };
    type b = { y: string, z: number };

    type gotA = DiffKeys<a, b>;
    type gotB = DiffKeys<b, a>;

    assert<gotA, 'x'>(t);
    assert<gotB, 'z'>(t);
});

test('Can get all keys between objects', t => {
    type a = { w: number, x: string };
    type b = { x: number, z: boolean };

    type got = AllKeys<a, b>;
    type expected = 'w' | 'x' | 'z';

    assert<got, expected>(t);
});

test('Can omit keys from an object', t => {
    type a = { x: number, y: string, z: boolean };

    type got = Omit<a, 'x' | 'y'>;
    type expected = { z: boolean };

    assert<got, expected>(t);
});

test('Can merge two objects, resolving matching keys by rightmost object', t => {
    type a = { x: number, y: string };
    type b = { y: number, z: string };

    type got = Merge<a, b>;
    type expected = { x: number, y: number, z: string };

    assert<got, expected>(t);
});

test('Can get a deep partial object', t => {
    type a = {
        b: {
            c: number
        },
        d: string
    };

    type got = DeepPartial<a>;
    type expected = {
        b?: {
            c?: number
        },
        d?: string
    };

    assert<got, expected>(t);
});

test('Can get an object with only shared properties', t => {
    type a = { x: number, y: string };
    type b = { y: string, z: string };

    type expected = { y: string };

    assert<Intersect<a, b>, expected>(t);
});

test('Can overwrite properties on an object', t => {
    type a = { x: number, y: string, z: 'hello there' };

    type expected = { x: number, y: string, z: 'hello' | 'there' };

    assert<Overwrite<a, { z: 'hello' | 'there' }>, expected>(t);
    assert<Overwrite<a, { z: 'hello' | 'there', w: number }>, expected>(t);
});

test('Can make properties optional', t => {
    type x = { x: number, y: string, z: 'hello there' };

    type expected = { x?: number, y?: string, z: 'hello there' };

    assert<Optional<x, 'x' | 'y'>, expected>(t);
});

test('Can make nested object readonly', t => {
    type x = { x: { a: 1, b: 'hi' }, y: 'hey' };

    type expected = { readonly x: Readonly<{ a: 1, b: 'hi' }>, readonly y: 'hey' };
    type got = DeepReadonly<x>;

    assert<got, expected>(t);
});
