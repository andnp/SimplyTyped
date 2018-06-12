import test from 'ava';
import { assert } from '../helpers/assert';

import { True, False, IsOne } from '../../src';

test('Can check if a number is one', t => {
    type notOne = IsOne<0>;
    type one = IsOne<1>;
    assert<notOne, False>(t);
    assert<one, True>(t);
});
