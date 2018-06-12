import test from 'ava';
import { assert } from '../../helpers/assert';

import { objectKeys } from '../../../src';

test('Can get keys of an object', t => {
    const o = { a: 'hi', b: 22 };
    const keys = objectKeys(o);

    type K = typeof keys;
    type expected = Array<'a' | 'b'>;
    assert<K, expected>(t);
    assert<expected, K>(t);

    t.deepEqual(keys, ['a', 'b']);
});
