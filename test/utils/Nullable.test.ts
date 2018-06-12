import test from 'ava';
import { assert } from '../helpers/assert';

import { Nullable } from '../../src';

test('Will make a type nullable (null | undefined)', t => {
    type got = Nullable<string>;
    type expected = string | null | undefined;

    assert<got, expected>(t);
});

test('Will make a type not nullable', t => {
    type got = NonNullable<Nullable<string>>;

    assert<got, string>(t);
});
