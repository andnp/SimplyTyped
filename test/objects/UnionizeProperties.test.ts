import test from 'ava';
import { assert } from '../helpers/assert';

import { UnionizeProperties } from '../../src';

test('Can get a union of all values in an object', t => {
    type a = { x: 'hi', y: 'there', z: 'friend' };

    type got = UnionizeProperties<a>;
    type expected = 'hi' | 'there' | 'friend';

    assert<got, expected>(t);
    assert<expected, got>(t);
});
