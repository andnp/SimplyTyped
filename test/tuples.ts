import test from 'ava';
import { Length, Vector, UnionizeTuple, IntersectTuple } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass(); }

// Tuples

test('Can get a union of all values in tuple', t => {
    type t = ['hi', 'there', 'friend'];

    type got = UnionizeTuple<t>;
    type expected = 'hi' | 'there' | 'friend';

    assert<got, expected>(t);
});

test('Can extend a vector with tuple', t => {
    function doStuff<T extends Vector<any>, E extends T, L extends number>(x: T, y: E, length: L) {
        assert<T, E>(t);
        assert<T['length'], L>(t);
    }

    const x: ['hey', 22] = ['hey', 22];
    const y: ['hey', 'there', 'friend'] = ['hey', 'there', 'friend'];
    doStuff(x, ['hey', 22], 2);
    doStuff(y, ['hey', 'there', 'friend'], 3);
});

// NOTE: this only works after typescript 2.7 hits, otherwise just returns `number`
test('Can get the length of a tuple', t => {
    type t = [1, 2, 3, 4];
    type x = ['hello', 'world'];

    type gotT = Length<t>;
    type gotX = Length<x>;

    assert<gotX, 2>(t);
    assert<gotT, 4>(t);
});

test('Can get the intersection of tuple values', t => {
    type t = [{a: 'hi'}, {b: 'there'}, {c: 'friend'}];

    type got = IntersectTuple<t>;
    type expected = {a: 'hi'} & {b: 'there'} & {c: 'friend'};

    assert<got, expected>(t);
});
