import test from 'ava';
import { assert } from '../helpers/assert';

import { DropString } from '../../src';

test('Can remove a string from a union of strings', t => {
    type a = 'hi' | 'there';
    type b = 'hey' | 'there' | never;

    assert<DropString<a, 'hi'>, 'there'>(t);
    assert<DropString<b, 'hey' | 'there'>, never>(t);
    assert<DropString<a, 'hi' | 'there'>, never>(t);
});
