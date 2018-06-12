import test from 'ava';
import { assert } from '../helpers/assert';

import { UnionizeTuple } from '../../src';

test('Can get a union of all values in tuple', t => {
    type t = ['hi', 'there', 'friend'];

    type got = UnionizeTuple<t>;
    type expected = 'hi' | 'there' | 'friend';

    assert<got, expected>(t);
    assert<expected, got>(t);
});
