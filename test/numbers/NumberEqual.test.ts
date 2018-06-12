import test from 'ava';
import { assert } from '../helpers/assert';

import { True, False, NumberEqual } from '../../src';

test('Can check if two numbers are equal', t => {
    type notEqual = NumberEqual<22, 23>;
    type equal = NumberEqual<12, 12>;
    assert<notEqual, False>(t);
    assert<equal, True>(t);
});
