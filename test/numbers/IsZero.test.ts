import test from 'ava';
import { assert } from '../helpers/assert';

import { True, False, IsZero } from '../../src';

test('Can check if a number is zero', t => {
    type notZero = IsZero<1>;
    type zero = IsZero<0>;
    assert<notZero, False>(t);
    assert<zero, True>(t);
});
