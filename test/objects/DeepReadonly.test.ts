import test from 'ava';
import { assert } from '../helpers/assert';

import { DeepReadonly } from '../../src';

test('Can make nested object readonly', t => {
    type x = { x: { a: 1, b: 'hi' }, y: 'hey' };

    type expected = { readonly x: Readonly<{ a: 1, b: 'hi' }>, readonly y: 'hey' };
    type got = DeepReadonly<x>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

test('Can make nested object with arrays readonly', t => {
    type x = { x: [{ a: 1, b: 'hi' }], y: 'hey' };

    type expected = { readonly x: Array<Readonly<{ a: 1, b: 'hi' }>>, readonly y: 'hey' };
    type got = DeepReadonly<x>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});
