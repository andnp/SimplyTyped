import test from 'ava';
import { assert } from '../helpers/assert';

import { False, True, IsNever } from '../../src';

test('Can ask if a string is of type "never"', t => {
    type str = 'hi';
    assert<IsNever<str>, False>(t);
    assert<IsNever<never>, True>(t);
    assert<IsNever<'hi' & 'hello'>, True>(t);
});
