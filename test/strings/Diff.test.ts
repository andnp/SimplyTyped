import test from 'ava';
import { assert } from '../helpers/assert';

import { Diff } from '../../src';

test('Can get difference between unions of strings', t => {
    type a = 'hi' | 'there';
    type b = 'hi' | 'my' | 'friend';

    type gotA = Diff<a, b>;
    type gotB = Diff<b, a>;

    assert<gotA, 'there'>(t);
    assert<gotB, 'my' | 'friend'>(t);
});
