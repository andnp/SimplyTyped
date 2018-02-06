import test from 'ava';
import { ConstructorFunction, Predicate, objectKeys, isKeyOf } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass(); }

test('Can build a constructor type for a type', t => {
    type Constructor = ConstructorFunction<{ x: string, y: number }>;
    class Thing { x: string = ''; y: number = 22; }

    assert<Constructor, typeof Thing>(t);
});

test('Can build a predicate function with single known argument type', t => {
    type PredFunc = Predicate<string>;
    type expected = (arg: string) => boolean;

    assert<PredFunc, expected>(t);
});

test('Can build a predicate function with unknown argument types', t => {
    type PredFunc = Predicate;
    type works = (arg1: string, arg2: number) => boolean;
    type expected = (...args: any[]) => boolean;

    assert<PredFunc, works>(t);
    assert<PredFunc, expected>(t);
});

test('Can get keys of an object', t => {
    const o = { a: 'hi', b: 22 };
    const keys = objectKeys(o);

    type K = typeof keys;
    type expected = Array<'a' | 'b'>;
    assert<K, expected>(t);

    t.deepEqual(keys, ['a', 'b']);
});

test('Can check if an object contains a key', t => {
    const o = { a: 'hi', b: 22 };
    const key1: string = 'a';

    if (isKeyOf(o, key1)) {
        assert<typeof key1, 'a' | 'b'>(t);
        t.pass();
    } else {
        assert<typeof key1, string>(t);
        t.fail();
    }
});
