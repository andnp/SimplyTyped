import test from 'ava';
import { assert } from '../helpers/assert';

import { OverwriteReturn } from '../../src';

test('Can change return type of a function', t => {
    type f = (x: 'hi', y: 'there', z: 22) => number;

    type got = OverwriteReturn<f, string>;
    type expected = (x: 'hi', y: 'there', z: 22) => string;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

