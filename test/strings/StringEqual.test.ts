import test from 'ava';
import { assert } from '../helpers/assert';

import { True, False, StringEqual } from '../../src';

test('Can check that two unions of strings are equal', t => {
    type a = 'hi' | 'there';
    type b = 'there' | 'hi';
    type c = 'hi' | 'there' | 'friend';

    assert<StringEqual<a, b>, True>(t);
    assert<StringEqual<b, a>, True>(t);
    assert<StringEqual<b, c>, False>(t);
});
