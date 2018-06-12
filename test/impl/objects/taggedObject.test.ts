import test from 'ava';
import { assert } from '../../helpers/assert';

import { taggedObject } from '../../../src';

test('Can generate a tagged object', t => {
    const obj = {
        a: { merp: 'hi' },
        b: { merp: 'there' },
        c: { merp: 'friend' },
    };

    const expected = {
        a: { name: 'a' as 'a', merp: 'hi' },
        b: { name: 'b' as 'b', merp: 'there' },
        c: { name: 'c' as 'c', merp: 'friend' },
    };

    const got = taggedObject(obj, 'name');

    t.deepEqual(got, expected);
    assert<typeof got, typeof expected>(t);
    assert<typeof expected, typeof got>(t);

});
