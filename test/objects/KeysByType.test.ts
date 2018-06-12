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
