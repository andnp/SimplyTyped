import test from 'ava';
import { assert } from '../helpers/assert';

import { GetKey } from '../../src';

test('Can safely get the value at a certain key if it exists', t => {
    type obj = { x: number, y: string };
    type expected = number;
    type got = GetKey<obj, 'x'>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

test('Will get `never` if key does not exist', t => {
    type obj = { x: number, y: string };
    type expected = never;
    type got = GetKey<obj, 'z'>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});
