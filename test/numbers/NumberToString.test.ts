import test from 'ava';
import { assert } from '../helpers/assert';

import { NumberToString } from '../../src';

test('Can get a number as a string', t => {
    type str = NumberToString<22>;
    assert<str, '22'>(t);
});
