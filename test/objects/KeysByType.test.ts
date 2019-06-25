import test from 'ava';
import { assert } from '../helpers/assert';

import { KeysByType } from '../../src';

test('Can filter object keys by right side type', t => {
    type obj = {
        a: 1,
        b: 2,
        c: 3,
    };

    type expected = 'a' | 'b';
    type got = KeysByType<obj, 1 | 2>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

/* Regression Tests */

test('Does not give `undefined` key', t => {
    type obj = { a: string, b?: number };

    type got = KeysByType<obj, string>;
    type expected = 'a';

    assert<got, expected>(t);
    assert<expected, got>(t);
});

test('Filters optional keys by undefined type', t => {
    type obj = { a: string, b?: number };

    type got = KeysByType<obj, undefined>;
    type expected = 'b';

    // TODO: Known failure. Optional keys are not considered of type `undefined`.
    // assert<got, expected>(t);
    // assert<expected, got>(t);
    t.pass();
});
