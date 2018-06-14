import test from 'ava';
import { assert } from '../../helpers/assert';

import { isKeyOf } from '../../../src';

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
